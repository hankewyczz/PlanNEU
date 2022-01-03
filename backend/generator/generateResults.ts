import { parseCourses } from "../parsers/parseCourse";
import { Filter } from "../filters/filter";
import { BinaryMeetingTime } from "../parsers/meetingTimes";
import {
    MinimalSection,
    CRNsResult,
    Results,
    Course,
    SectionWithCourse,
    ParsedSection,
    MeetingDay,
} from "../types/types";
import { MAX_COURSES, MAX_POSSIBILITIES, MAX_NUM_RESULTS } from "../utils/global";

export function generateResults(courses: Course[], course_filter: Filter): Results {
    // Create a CRN -> unparsed section mapping (do this first, since the sections will be mutated)
    const unparsed_sections = courses
        .map((c) => {
            const sections: Partial<SectionWithCourse>[] = JSON.parse(JSON.stringify(c.sections));
            sections.forEach((sec) => (sec["classId"] = `${c.subject}${c.classId}`));
            return sections as SectionWithCourse[];
        }) // Sections are composed of primative types, so this is an OK way to clone
        .flat();

    // Filter the sections, and remove any courses that are now empty lists
    const sections = parseCourses(courses)
        .map((course) => course.sections)
        .map((secs) => secs.filter((secs) => course_filter.checkSectionCompatibility(secs)));

    
    
    

    // We limit the number of courses we generate results for, to prevent overloading the server
    if (sections.length > MAX_COURSES) {
        throw Error(
            `A max of ${MAX_COURSES} courses are allowed; please remove some courses and try again.`
        );
    } 

    const day_compatibility = course_filter.checkDayCompatibility(checkMandatoryDays(sections));
    
    if (sections.length === 0 || !day_compatibility) {
        return {
            results: [],
            sections: [],
            courses: [],
            stats: {
                numCombinations: 0,
                time: 0,
            },
        };
    }

    // Check if we exceed the max possible combinations
    const num_combinations = sections.reduce((acc, cur) => acc * cur.length, 1);

    if (num_combinations > MAX_POSSIBILITIES) {
        throw Error(`Too many possible combinations (over ${MAX_POSSIBILITIES.toLocaleString()}).
        Please try removing a course with many sections (like a lab or recitation) and try agian.`);
    }

    // Create the result Generator object
    const result_generator = generateCombinations(sections);

    // Filter the results
    const section_mapping: Record<string, ParsedSection> = {};
    sections.forEach((secs) =>
        secs.forEach((sec) => {
            section_mapping[sec.crn] = sec;
        })
    );

    const filtered_results = [];

    for (const result of result_generator) {
        const sections_result = result.map((crn) => section_mapping[crn]);
        const compatible = course_filter.checkCompatibility(sections_result);

        if (compatible) {
            filtered_results.push(result);

            if (filtered_results.length >= MAX_NUM_RESULTS) {
                break;
            }
        }
    }

    return {
        results: filtered_results,
        sections: unparsed_sections,
        courses: courses,
        stats: {
            numCombinations: num_combinations,
            time: 0, // will be overridden
        },
    };
}


/**
 * Checks which days are mandatory for courses (ie. days such that every section has a meeting then)
 * @param courses A list of lists of parsed sections (ie. a list of courses)
 * @returns A set of the days, on which we must have class meetings
 */
export function checkMandatoryDays(courses: ParsedSection[][]): Set<MeetingDay> {
    const all_days: Set<MeetingDay> = new Set();
    for (const course of courses) {
        let course_days = new Set(Object.values(MeetingDay));

        for (const section of course) {
            course_days = new Set([...course_days].filter(i => section.meetings.days().has(i)));
        }

        course_days.forEach(elem => all_days.add(elem));
    }
    
    return all_days
}

/*
Generating a schedule is, computationally speaking, a tricky problem.
The scheduling problem is generally NP-Complete, and there's been plenty of research on it.

Due to the factorially-expanding runtime, we need to reduce the complexity as much as possible.
- Limit the number of classes (TODO: what's a reasonable number? 6? 7?)
- Limit the number of sections
    - For each class, we should only consider a max number of sections (maybe 10?)
    - If the users want different sections, they can select more specific filters
- Block-based scheduling
    - This is an optimized way of checking time overlaps.
    - Assume that the class schedules are on time blocks. In our case, I ~think~ the largest block we can be sure about is 5 mins.
*/
export function* generateCombinations(courses: ParsedSection[][]): Generator<CRNsResult> {
    // We sort so that the courses with the fewest number of sections are handled first
    // When there aren't many sections, each time conflict will reduce the number of work done down the line dramatically
    courses.sort((a, b) => a.length - b.length);

    const sizes = courses.map((c) => c.length);

    // Check if any of the course arrays are empty
    // This means we filtered out all the sections - no possible results, so just return right away
    if (sizes.includes(0)) {
        return;
    }

    // Initialize the indexes at 0 each
    let indexes: number[] = new Array(courses.length).fill(0);

    // Determines if we carry the digit over
    let carry = 0;
    // If the carry is not 0 at the main loop, that means we've overflowed
    while (carry === 0) {
        const sections = indexes.map((section, course) => courses[course][section]);
        const combined = BinaryMeetingTime.combineMany(sections.map((s) => s.meetings));

        let i = 0; // Set this up here, so we can override it
        carry = 1;

        if (combined instanceof BinaryMeetingTime) {
            yield sections.map((s) => s.crn);
        } else {
            // There was a conflict - we want to increment that column, to save time
            i = combined;
        }

        // Increase the index counter
        for (; i < sizes.length; i++) {
            // The leading semicolon skips variable initialization
            indexes[i] += carry;

            // Reset this digit
            if (indexes[i] >= sizes[i]) {
                indexes[i] = 0;
                carry = 1;
            } else {
                carry = 0;
                break;
            }
        }
    }
}
