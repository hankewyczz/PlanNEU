import { BinaryMeetingTime } from "../types/meetingTimes";
import { PartialResult, MinimalSection, Result, Course } from "../types/types";
import { MAX_COURSES, MAX_POSSIBILITIES, NUM_RESULTS } from "../utils/global";

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
export function generateResults(courses: Course[]): Result[] {
    // We limit the number of courses we generate results for, to prevent overloading the server
    if (courses.length > MAX_COURSES) {
        throw Error(
            `A max of ${MAX_COURSES} courses are allowed; please remove some courses and try again.`
        );
    }
    // Check if we exceed the max possible combinations
    if (
        courses.reduce((acc, cur) => acc * cur.sections.length, 1) >
        MAX_POSSIBILITIES
    ) {
        let max = 0;
        let max_course: string | null = null;

        for (const course of courses) {
            if (course.sections.length > max) {
                max = course.sections.length;
                max_course = course.name;
            }
        }

        throw Error(`Too many possible combinations (over ${MAX_POSSIBILITIES.toLocaleString()}).
        Please try removing a course with many sections (like ${max_course}) and trying agian.`);
    }
    const start = new Date();

    return []
}

export function _generateCombinations(courses: MinimalSection[][]): Result[] {
    // We sort so that the courses with the fewest number of sections are handled first
    // When there aren't many sections, each time conflict will reduce the number of work done down the line dramatically
    // tldr: makes this more efficient
    courses.sort((a, b) => a.length - b.length);

    const results: Result[] = [];

    /**
     * Recursive inner function to create combinations.
     */
    function combination(courseIndex = 0, output: PartialResult | null = null) {
        // Check if we've already hit our quota
        if (results.length >= NUM_RESULTS) {
            return;
        }

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
                // We're at the end of a combination -- add it to the results array
                results.push(outputObj.crns);
            } else {
                // Otherwise, we increment the index and keep going
                combination(courseIndex + 1, outputObj);
            }
        }
    }

    // Create the combinations
    combination();

    return results;
}
