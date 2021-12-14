import {
    BinaryMeetingTime,
    MinimalResult,
    MinimalSection,
} from "../types/types";
import { MAX_COURSES, MAX_SECTIONS_PER_COURSE } from "../utils/global";

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
export function generateCombinations(
    courses: MinimalSection[][]
): MinimalResult[] {
    // We limit the number of courses we generate results for, to prevent overloading the server
    if (courses.length > MAX_COURSES) {
        throw Error(`A max of ${MAX_COURSES} courses are allowed; please remove some courses and try again.`)
    }

    const start = new Date();

    const results: MinimalResult[] = [];

    /**
     * Recursive inner function to create combinations.
     */
    function combination(courseIndex = 0, output: MinimalResult | null = null) {
        // Iterate over every section in this inner array
        for (let i = 0; i <  courses[courseIndex].length; i++) {
            // Limit the number of sections we consider
            if (i >= MAX_SECTIONS_PER_COURSE) {
                break;
            }
            const sec = courses[courseIndex][i];
            // If there's no output yet, initialize it
            // We don't want to update `output` directly - we want it to be constant for each section
            let outputObj;

            if (output === null) {
                outputObj = new MinimalResult([sec.crn], sec.meetings);
            } else {
                outputObj = output;
                // Try to add this section to the output
                const combined = BinaryMeetingTime.combine(
                    outputObj.meetings,
                    sec.meetings
                );

                if (!combined) {
                    continue;
                }

                // Create a new object, so we aren't mutating the same one
                outputObj = new MinimalResult(
                    [...outputObj.crns, sec.crn],
                    combined
                );
            }

            if (courseIndex === courses.length - 1) {
                // We're at the end of a combination -- add it to the results array
                results.push(outputObj);
            } else {
                // Otherwise, we increment the index and keep going
                combination(courseIndex + 1, outputObj);
            }
        }
    }

    // Create the combinations
    combination();

    let end = new Date();
    console.log(`Took ${(end.getTime() - start.getTime()) / 1000} seconds`);

    return results;
}
