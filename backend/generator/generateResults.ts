import { parseCourses } from "../api_outgoing/parsers/parseCourse";
import { minifySection } from "../api_outgoing/parsers/parseSection";
import { Filter } from "../filters/filter";
import { BinaryMeetingTime } from "../types/meetingTimes";
import {
    PartialResult,
    MinimalSection,
    CRNsResult,
    Results,
    Course,
    Section,
} from "../types/types";
import { MAX_COURSES, MAX_POSSIBILITIES, NUM_RESULTS } from "../utils/global";

export function generateResults(
    courses: Course[],
    course_filter: Filter
): Results {
    // Create a CRN -> unparsed section mapping (do this first, since the sections will be mutated)
    const unparsed_sections = courses
        .map((c) => JSON.parse(JSON.stringify(c.sections))) // Sections are composed of primative types, so this is an OK way to clone
        .flat();
    const section_mapping: Record<string, Section> = {};
    unparsed_sections.forEach((sec) => (section_mapping[sec.crn] = sec));

    // Filter the sections, and remove any courses that are now empty lists
    const sections = parseCourses(courses)
        .map((course) => course.sections)
        .map((secs) =>
            secs.filter((secs) => course_filter.checkSectionCompatibility(secs))
        )
        .filter((course) => course.length > 0);

    // We limit the number of courses we generate results for, to prevent overloading the server
    if (sections.length > MAX_COURSES) {
        throw Error(
            `A max of ${MAX_COURSES} courses are allowed; please remove some courses and try again.`
        );
    } else if (sections.length === 0) {
        return {
            results: [],
            sections: {},
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

    // Minifiy and generate the results
    const minimized_sections = sections.map((secs) =>
        secs.map((sec) => minifySection(sec))
    );

    const results = generateMinifiedCombinations(minimized_sections);

    return {
        results: results,
        sections: section_mapping,
        courses: courses,
        stats: {
            numCombinations: num_combinations,
            time: 0, // will be overridden
        },
    };
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
export function generateMinifiedCombinations(
    courses: MinimalSection[][]
): CRNsResult[] {
    // We sort so that the courses with the fewest number of sections are handled first
    // When there aren't many sections, each time conflict will reduce the number of work done down the line dramatically
    // tldr: makes this more efficient
    courses.sort((a, b) => a.length - b.length);

    const results: CRNsResult[] = [];

    /**
     * Recursive inner function to create combinations.
     */
    function _combination(
        courseIndex = 0,
        output: PartialResult | null = null
    ): void {
        // Iterate over every section in this inner array
        for (let i = 0; i < courses[courseIndex].length; i++) {
            const sec = courses[courseIndex][i];
            // If there's no output yet, initialize it
            // We don't want to update `output` directly - we want it to be constant for each section
            let outputObj: null | PartialResult;

            if (output === null) {
                outputObj = new PartialResult([sec.crn], sec.meetings);
            } else {
                // Try to add this section to the output
                const combined = BinaryMeetingTime.combine(
                    output.meetings,
                    sec.meetings
                );

                if (!combined) {
                    continue;
                }

                // Create a new object, so we aren't mutating the same one
                outputObj = new PartialResult(
                    [...output.crns, sec.crn],
                    combined
                );
            }

            if (courseIndex === courses.length - 1) {
                // Check if we've already hit our quota
                if (results.length >= NUM_RESULTS) {
                    return;
                }
                // We're at the end of a combination -- add it to the results array
                results.push(outputObj.crns);
            } else {
                // Otherwise, we increment the index and keep going
                _combination(courseIndex + 1, outputObj);
            }
        }
    }

    // Create the combinations
    _combination();

    return results;
}
