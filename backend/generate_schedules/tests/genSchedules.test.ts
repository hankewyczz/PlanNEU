import { parseCourses } from "../../parsers/parseCourse";
import { generateCombinations, generateSchedules } from "../generateSchedules";
import courses from "../../parsers/tests/data/courses.data";
import results from "./data/genSchedules.data";
import { nestedArrayEquality, MAX_NUM_RESULTS } from "../../utils/global";
import { FilterBuilder } from "../../filters/filter";
import sections from "../../parsers/tests/data/sections.data";
import { MeetingDay } from "../../types/types";

describe("Generating combinations", () => {
    test("Only one course", () => {
        // The results should return the same sections, since they won't be scheduled against anything else
        expect([...generateCombinations([courses.cs3000_202210_parsed().sections])]).toEqual(
            results.cs3000_202210_only
        );
    });

    test("Two courses, partial overlap", () => {
        // CS3800 and CS3000
        nestedArrayEquality(
            [
                ...generateCombinations([
                    courses.cs3000_202210_parsed().sections,
                    courses.cs3800_202210_parsed().sections,
                ]),
            ],
            results.cs3000_and_cs3800_202210
        );
    });

    test("Two courses, no overlap", () => {
        const results_1 = [
            ...generateCombinations([
                courses.cs3000_202210_parsed().sections,
                courses.cs3001_202210_parsed().sections,
            ]),
        ];

        // This is the max number of combinations possible
        const max_combinations =
            courses.cs3001_202210_parsed().sections.length *
            courses.cs3000_202210_parsed().sections.length;

        // These two courses occur exclusivly on separate days, so there's no overlap - should return every single combo there is
        expect([...results_1].length).toEqual(max_combinations);
    });

    test("Three courses, partial overlap", () => {
        // CS3001 has no conflict with either CS3000 or CS3800
        // However, CS3000 and CS3800 have conflicts with one another
        const results_1 = [
            ...generateCombinations([
                courses.cs3000_202210_parsed().sections,
                courses.cs3001_202210_parsed().sections,
                courses.cs3800_202210_parsed().sections,
            ]),
        ];

        // We've already tested CS3000 and CS3800 - now we add CS3001 into the mix
        const max_combinations =
            courses.cs3001_202210_parsed().sections.length *
            results.cs3000_and_cs3800_202210.length;

        // These sets of courses occur exclusivly on separate days, so there's no overlap - should return every single combo there is
        expect(results_1.length).toEqual(max_combinations);
    });

    test("Complex example", () => {
        const results_1 = [
            ...generateCombinations([
                courses.cs3000_202210_parsed().sections,
                courses.cs2800_202210_parsed().sections,
                courses.cs3800_202210_parsed().sections,
                courses.cs4850_202210_parsed().sections,
            ]),
        ];

        nestedArrayEquality(results_1, results.complex_example);
    });

    test("Complex example #2", () => {
        const results_1 = generateSchedules(
            [courses.cs3000_202210(), courses.eece2323_202210()],
            new FilterBuilder().build()
        );

        nestedArrayEquality(results_1.results, results.complex_example_2);
    });

    test("Complex example #3", () => {
        const results_1 = generateSchedules(
            [courses.cs3000_202210(), courses.eece2323_202210(), courses.eece2322_202210()],
            new FilterBuilder().build(),
            300 // Don't limit result number for this
        );

        nestedArrayEquality(results_1.results, results.complex_example_3);
    });

    test("Limit number of results", () => {
        const results_1 = generateSchedules(
            [courses.honr1102_202210(), courses.thtr1170_202210()],
            new FilterBuilder().build()
        ).results;

        expect(results_1.length <= MAX_NUM_RESULTS).toBeTruthy();
    });

    test("Remove filtered courses", () => {
        const results = generateCombinations([courses.cs3000_202210_parsed().sections, []]);

        expect([...results]).toEqual([]);
    });
});

describe("Testing complete result generation", () => {
    test("Too many courses (but not too many combos)", () => {
        const course_list = [
            courses.cs2800_202210(),
            courses.cs2800_202210(),
            courses.cs2800_202210(),
            courses.cs2800_202210(),
            courses.cs2800_202210(),
            courses.cs2800_202210(),
            courses.cs2800_202210(),
            courses.cs2800_202210(),
            courses.cs2800_202210(),
        ];

        expect(() => {
            generateSchedules(course_list, new FilterBuilder().build());
        }).toThrow();
    });

    test("Too many combinations (but not too many courses)", () => {
        const course_list = [
            courses.cs3001_202210(),
            courses.eece2323_202210(),
            courses.eece2322_202210(),
            courses.phil1145_202210(),
            courses.honr1102_202210(),
            courses.thtr1170_202210(),
        ];

        expect(() => {
            generateSchedules(course_list, new FilterBuilder().build());
        }).toThrow();
    });

    test("Default result", () => {
        expect(generateSchedules([], new FilterBuilder().build())).toMatchObject({
            results: [],
            sections: {},
            courses: [],
            stats: {
                numCombinations: 0,
                time: 0,
            },
        });
    });

    test("Conflict with days", () => {
        expect(
            generateSchedules(
                [courses.cs3800_202210()],
                new FilterBuilder().setSpecificDaysFree([MeetingDay.TUESDAY]).build()
            )
        ).toMatchObject({
            results: [],
            sections: {},
            courses: [],
            stats: {
                numCombinations: 0,
                time: 0,
            },
        });
    });

    test("Make sure all sections are listed & unparsed", () => {
        const course_list = [courses.cs3800_202210(), courses.cs3000_202210()];
        const filter = new FilterBuilder().setStartTime(36_000).build();
        const results = generateSchedules(course_list, filter);

        expect(results.sections.sort()).toEqual([
            { ...sections.cs3800_202210_1(), classId: "CS3800" },
            { ...sections.cs3800_202210_2(), classId: "CS3800" },
            { ...sections.cs3000_202210_1(), classId: "CS3000" },
            { ...sections.cs3000_202210_2(), classId: "CS3000" },
            { ...sections.cs3000_202210_3(), classId: "CS3000" },
        ]);
    });

    test("Make sure that courses result is accurate", () => {
        const course_list = [courses.cs3800_202210(), courses.cs3000_202210()];
        const filter = new FilterBuilder().setStartTime(36_000).build();
        const results = generateSchedules(course_list, filter);

        // The courses should be COMPLETE, even though some sections were filtered out int he process
        expect(results.courses.sort()).toEqual(
            parseCourses([courses.cs3800_202210(), courses.cs3000_202210()]).sort()
        );
    });
});
