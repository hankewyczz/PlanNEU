// import {
//     minCourse,
//     minCourses,
//     parseCourses,
// } from "../../api_outgoing/parsers/parseCourse";
// import {
//     generateMinifiedCombinations,
//     generateResults,
// } from "../generateResults";
// import courses from "../../api_outgoing/parsers/tests/data/courses.data";
// import results from "./data/genResults.data";
// import { nestedArrayEquality, MAX_NUM_RESULTS } from "../../utils/global";
// import { FilterBuilder } from "../../filters/filter";
// import sections from "../../api_outgoing/parsers/tests/data/sections.data";

// describe("Generating combinations", () => {
//     test("Only one course", () => {
//         // The results should return the same sections, since they won't be scheduled against anything else
//         nestedArrayEquality(
//             generateMinifiedCombinations([
//                 minCourse(courses.cs3000_202210_parsed()),
//             ]),
//             results.cs3000_202210_only
//         );

//         nestedArrayEquality(
//             generateMinifiedCombinations([
//                 minCourse(courses.cs3800_202210_parsed()),
//             ]),
//             results.cs3800_202210_only
//         );
//     });

//     test("Two courses, partial overlap", () => {
//         // CS3800 and CS3000
//         nestedArrayEquality(
//             generateMinifiedCombinations([
//                 minCourse(courses.cs3000_202210_parsed()),
//                 minCourse(courses.cs3800_202210_parsed()),
//             ]),
//             results.cs3000_and_cs3800_202210
//         );
//     });

//     test("Two courses, no overlap", () => {
//         const results_1 = generateMinifiedCombinations([
//             minCourse(courses.cs3000_202210_parsed()),
//             minCourse(courses.cs3001_202210_parsed()),
//         ]);
//         // This is the max number of combinations possible
//         const max_combinations =
//             courses.cs3000_202210_min_sections.length *
//             courses.cs3001_202210_min_sections.length;
//         // These two courses occur exclusivly on separate days, so there's no overlap - should return every single combo there is
//         expect(results_1.length).toEqual(max_combinations);
//     });

//     test("Three courses, partial overlap", () => {
//         // CS3001 has no conflict with either CS3000 or CS3800
//         // However, CS3000 and CS3800 have conflicts with one another
//         const results_1 = generateMinifiedCombinations([
//             minCourse(courses.cs3000_202210_parsed()),
//             minCourse(courses.cs3001_202210_parsed()),
//             minCourse(courses.cs3800_202210_parsed()),
//         ]);

//         // We've already tested CS3000 and CS3800 - now we add CS3001 into the mix
//         const max_combinations =
//             courses.cs3001_202210_min_sections.length *
//             results.cs3000_and_cs3800_202210.length;

//         // These sets of courses occur exclusivly on separate days, so there's no overlap - should return every single combo there is
//         expect(results_1.length).toEqual(max_combinations);
//     });

//     test("Complex example", () => {
//         const results_1 = generateMinifiedCombinations([
//             minCourse(courses.cs3000_202210_parsed()),
//             minCourse(courses.cs2800_202210_parsed()),
//             minCourse(courses.cs3800_202210_parsed()),
//             minCourse(courses.cs4850_202210_parsed()),
//         ]);

//         nestedArrayEquality(results_1, results.complex_example);
//     });

//     test("Limit number of results", () => {
//         const results_1 = generateMinifiedCombinations(
//             minCourses(
//                 parseCourses([
//                     courses.honr1102_202210(),
//                     courses.thtr1170_202210(),
//                 ])
//             )
//         );

//         expect(results_1.length <= MAX_NUM_RESULTS).toBeTruthy();
//     });
// });

// describe("Testing complete result generation", () => {
//     test("Too many courses (but not too many combos)", () => {
//         const course_list = [
//             courses.cs2800_202210(),
//             courses.cs2800_202210(),
//             courses.cs2800_202210(),
//             courses.cs2800_202210(),
//             courses.cs2800_202210(),
//             courses.cs2800_202210(),
//             courses.cs2800_202210(),
//             courses.cs2800_202210(),
//             courses.cs2800_202210(),
//         ];

//         expect(() => {
//             generateResults(course_list, new FilterBuilder().build());
//         }).toThrow();
//     });

//     test("Too many combinations (but not too many courses)", () => {
//         const course_list = [
//             courses.cs3001_202210(),
//             courses.eece2323_202210(),
//             courses.eece2322_202210(),
//             courses.phil1145_202210(),
//             courses.honr1102_202210(),
//             courses.thtr1170_202210(),
//         ];

//         expect(() => {
//             generateResults(course_list, new FilterBuilder().build());
//         }).toThrow();
//     });

//     test("Default result", () => {
//         expect(generateResults([], new FilterBuilder().build())).toMatchObject({
//             results: [],
//             sections: {},
//             courses: [],
//             stats: {
//                 numCombinations: 0,
//                 time: 0,
//             },
//         });
//     });

//     test("Make sure that section mapping is accurate", () => {
//         const course_list = [courses.cs3800_202210(), courses.cs3000_202210()];
//         const filter = new FilterBuilder().setStartTime(36_000).build();
//         const results = generateResults(course_list, filter);

//         expect(Object.keys(results.sections).sort()).toEqual([
//             "10376",
//             "14051",
//             "14087",
//             "15730",
//             "16453",
//         ]);
//         expect(results.sections["10376"]).toEqual(sections.cs3800_202210_1());
//         expect(results.sections["14087"]).toEqual(sections.cs3000_202210_1());
//         expect(results.sections["15730"]).toEqual(sections.cs3000_202210_2());
//         expect(results.sections["16453"]).toEqual(sections.cs3800_202210_2());
//     });

//     test("Make sure that courses result is accurate", () => {
//         const course_list = [courses.cs3800_202210(), courses.cs3000_202210()];
//         const filter = new FilterBuilder().setStartTime(36_000).build();
//         const results = generateResults(course_list, filter);

//         // The courses should be COMPLETE, even though some sections were filtered out int he process
//         expect(results.courses.sort()).toEqual(
//             parseCourses([
//                 courses.cs3800_202210(),
//                 courses.cs3000_202210(),
//             ]).sort()
//         );
//     });
// });
