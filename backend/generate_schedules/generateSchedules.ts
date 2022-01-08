import { parseCourses } from "../parsers/parseCourse";
import { Filter } from "../filters/filter";
import { BinaryMeetingTime } from "../parsers/meetingTimes";
import {
    CRNsResult,
    ResultsGenerator,
    Course,
    SectionWithCourse,
    ParsedSection,
} from "../types/types";
import { MAX_COURSES, MAX_POSSIBILITIES } from "../utils/global";

export function generateSchedules(
    courses: Course[],
    course_filter: Filter,
    offset?: string[]
): ResultsGenerator {
    // Create a CRN -> unparsed section mapping (do this first, since the sections will be mutated)
    const unparsed_sections = courses
        .map((c) => {
            // Sections are composed of nested primitive types, so JSON is an OK way to deep clone
            const sections: Partial<SectionWithCourse>[] = JSON.parse(JSON.stringify(c.sections));
            sections.forEach((sec) => (sec["classId"] = `${c.subject}${c.classId}`));
            return sections as SectionWithCourse[];
        })
        .flat();

    const sections = parseCourses(courses)
        .map((course) => course.sections)
        .map((secs) => secs.filter((sec) => course_filter.sectionCompatible(sec)));

    // We limit the number of courses we generate results for, to prevent overloading the server
    if (sections.length > MAX_COURSES) {
        throw Error(`Only ${MAX_COURSES} courses are allowed; please remove some and try again.`);
    }

    if (sections.length === 0) {
        return {
            results: (function* () {})(), // An empty Generator object - sucks that there's less verbose way of doing it
            sections: [],
            courses: [],
        };
    }

    // Check if we exceed the max possible combinations
    const num_combinations = sections.reduce((acc, cur) => acc * cur.length, 1);
    if (num_combinations > MAX_POSSIBILITIES) {
        throw Error(`Too many possible combinations (over ${MAX_POSSIBILITIES.toLocaleString()}).
        Please try removing a course with many sections (like a lab or recitation) and try agian.`);
    }

    return {
        results: generateCombinations(sections, course_filter, offset),
        sections: unparsed_sections,
        courses: courses,
    };
}

/**
 *  A helper function to increment the indexes, like an odometer - increments the first digit until overflow,
 * then the second, etc. Returns a boolean indicating if the last digit overflowed.
 * 
 * Example: sizes = [1,2,2]
 * 
 * 000 -> 001 -> 010 -> 011
 * @param indexes An array of indexes, which will be mutated
 * @param sizes An array of sizes, representing the size of the array at each index
 * @param start_at The index at which we start
 * @returns A boolean indicating if the indexes have overflowed
 */
export function incrementIndexesOverflow(
    indexes: number[],
    sizes: number[],
    start_at = sizes.length - 1
): boolean {
    for (let i = start_at; i >= 0; i--) {
        indexes[i] += 1;

        // Reset this digit & carry the rest
        if (indexes[i] >= sizes[i]) {
            indexes[i] = 0;
        } else {
            return false;
        }
    }

    return true;
}

/**
 * Creates a Generator object, returning the results.
 *
 * Generating a schedule is generally NP-Complete, so we need to agressivly reduce the complexity of our problem.
 * We limit the number of classes & number of sections (after filtering), and also use a block-based schedule
 * to optimize time overlaps.
 * @param courses A list of lists of sections
 * @param offset A list of CRNs, indicating where in the results we should jump to (useful for pagination)
 * @returns A Generator of Results
 */
export function* generateCombinations(
    courses: ParsedSection[][],
    course_filter: Filter,
    offset?: string[]
): Generator<CRNsResult> {
    // We sort so that the courses with the fewest number of sections are handled first
    // When there aren't many sections, each time conflict will reduce the number of work done down the line dramatically
    courses.sort((a, b) => a.length - b.length);
    // Sort each course's sections, so we have a consistent order for the offsets
    courses.forEach((c) => c.sort((a, b) => a.crn.localeCompare(b.crn)));

    const sizes = courses.map((c) => c.length);

    // Check if any of the course arrays are empty - no possible results
    if (sizes.includes(0)) {
        return;
    }

    // Initialize the indexes at 0 each
    const indexes: number[] = new Array(courses.length).fill(0);

    // If we are passed an offset, we handle it here. The offset is a list of CRNs.
    // We want to skip the generation ahead to those CRNs (inclusive, so these CRNs are the first ones we check)
    // This allows us to handle pagination via the API
    if (offset !== undefined) {
        for (const [c_idx, course] of courses.entries()) {
            for (const [s_idx, sec] of course.entries()) {
                if (offset.includes(sec.crn)) {
                    indexes[c_idx] = s_idx;
                    break;
                }
            }
        }
    }

    // Now, generate results and keep going until we overflow
    while (true) {
        const sections = indexes.map((section, course) => courses[course][section]);
        const combined_meetings = BinaryMeetingTime.combineMany(sections.map((s) => s.meetings));

        let i = sizes.length - 1;

        if (combined_meetings instanceof BinaryMeetingTime) {
            if (course_filter.resultCompatible(sections)) {
                yield sections.map((s) => s.crn);
            }
        } else {
            // There was a conflict - we want to increment that column, to save time
            i = combined_meetings;
        }

        // Increase the index counter
        const overflow = incrementIndexesOverflow(indexes, sizes, i);
        if (overflow) {
            break;
        }
    }
}
