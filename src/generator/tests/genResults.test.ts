import { minCourse } from "../../api/parsers/parseCourse";
import { _generateCombinations } from "../generateResults";
import courses from "../../api/parsers/tests/data/courses.data";
import results from "./data/genResults.data";
import { resultsEquality } from "../../utils/global";

describe("Generating combinations", () => {
    test("Only one course", () => {
        // The results should return the same sections, since they won't be scheduled against anything else
        resultsEquality(
            _generateCombinations([minCourse(courses.cs3000_202210_parsed())]),
            results.cs3000_202210_only
        );

        resultsEquality(
            _generateCombinations([minCourse(courses.cs3800_202210_parsed())]),
            results.cs3800_202210_only
        );
    });

    test("Two courses, partial overlap", () => {
        // CS3800 and CS3000
        resultsEquality(
            _generateCombinations([
                minCourse(courses.cs3000_202210_parsed()),
                minCourse(courses.cs3800_202210_parsed()),
            ]),
            results.cs3000_and_cs3800_202210
        );
    });

    test("Two courses, no overlap", () => {
        const results_1 = _generateCombinations([
            minCourse(courses.cs3000_202210_parsed()),
            minCourse(courses.cs3001_202210_parsed()),
        ]);
        // This is the max number of combinations possible
        const max_combinations =
            courses.cs3000_202210_min_sections.length *
            courses.cs3001_202210_min_sections.length;
        // These two courses occur exclusivly on separate days, so there's no overlap - should return every single combo there is
        expect(results_1.length).toEqual(max_combinations);
    });

    test("Three courses, partial overlap", () => {
        // CS3001 has no conflict with either CS3000 or CS3800
        // However, CS3000 and CS3800 have conflicts with one another
        const results_1 = _generateCombinations([
            minCourse(courses.cs3000_202210_parsed()),
            minCourse(courses.cs3001_202210_parsed()),
            minCourse(courses.cs3800_202210_parsed())
        ]);

        // We've already tested CS3000 and CS3800 - now we add CS3001 into the mix
        const max_combinations =
            courses.cs3001_202210_min_sections.length *
            results.cs3000_and_cs3800_202210.length;

        // These sets of courses occur exclusivly on separate days, so there's no overlap - should return every single combo there is
        expect(results_1.length).toEqual(max_combinations);
    });

    test("Complex example", () => {
        const results_1 = _generateCombinations([
            minCourse(courses.cs3000_202210_parsed()),
            minCourse(courses.cs2800_202210_parsed()),
            minCourse(courses.cs3800_202210_parsed()),
            minCourse(courses.cs4850_202210_parsed())
        ]);

        resultsEquality(results_1, results.complex_example);
    })
});

// test("Gen results", () => {
//     const parsedCourses = parseCourses([
//         data.cs2800_202210(),
//         data.cs2801_202210(),
//         data.cs3000_202210(),
//         data.cs3001_202210(),
//         data.cs3800_202210(),
//         data.eece2323_202210(),
//         data.eece2322_202210(),
//         // data.phil1145_202210(),
//         // data.honr1102_202210(),
//         // data.thtr1170_202210(),
//     ]);
//     const minifiedCourses = minCourses(parsedCourses);
//     console.log(
//         `${minifiedCourses.reduce(
//             (acc, cur) => acc * cur.length,
//             1
//         )} possibilities`
//     );
//     const results = generateCombinations(minifiedCourses);
//     console.log(`${results.length} found`);
// });
