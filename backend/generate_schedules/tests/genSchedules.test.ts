import { parseCourses } from "../../parsers/parseCourse";
import {
    generateCombinations,
    generateSchedules,
    incrementIndexesOverflow,
} from "../generateSchedules";
import courses from "../../parsers/tests/data/courses.data";
import results from "./data/genSchedules.data";
import { nestedArrayEquality, MAX_NUM_RESULTS } from "../../utils/global";
import { Filter, FilterBuilder } from "../../filters/filter";
import sections from "../../parsers/tests/data/sections.data";
import { MeetingDay } from "../../types/types";
import { parseMeetingsToTimestamps } from "../../parsers/timestampMeetings";

describe("Generating combinations", () => {
    let filter: Filter;
    beforeAll(() => {
        filter = new FilterBuilder().build();
    });

    test("Only one course", () => {
        // The results should return the same sections, since they won't be scheduled against anything else
        expect([
            ...generateCombinations([courses.cs3000_202210_parsed().sections], filter),
        ]).toEqual(results.cs3000_202210_only);
    });

    test("Two courses, partial overlap", () => {
        // CS3800 and CS3000
        nestedArrayEquality(
            [
                ...generateCombinations(
                    [
                        courses.cs3000_202210_parsed().sections,
                        courses.cs3800_202210_parsed().sections,
                    ],
                    filter
                ),
            ],
            results.cs3000_and_cs3800_202210
        );
    });

    test("Two courses, no overlap", () => {
        const results_1 = [
            ...generateCombinations(
                [courses.cs3000_202210_parsed().sections, courses.cs3001_202210_parsed().sections],
                filter
            ),
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
            ...generateCombinations(
                [
                    courses.cs3000_202210_parsed().sections,
                    courses.cs3001_202210_parsed().sections,
                    courses.cs3800_202210_parsed().sections,
                ],
                filter
            ),
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
            ...generateCombinations(
                [
                    courses.cs3000_202210_parsed().sections,
                    courses.cs2800_202210_parsed().sections,
                    courses.cs3800_202210_parsed().sections,
                    courses.cs4850_202210_parsed().sections,
                ],
                filter
            ),
        ];

        nestedArrayEquality(results_1, results.complex_example);
    });

    test("Complex example #2", () => {
        const results_1 = generateSchedules(
            [courses.cs3000_202210(), courses.eece2323_202210()],
            new FilterBuilder().build()
        );

        nestedArrayEquality([...results_1.results], results.complex_example_2);
    });

    test("Offsets", () => {
        const results_1 = generateSchedules(
            [courses.cs3000_202210(), courses.eece2323_202210()],
            new FilterBuilder().build(),
            results.complex_example_2[4] // Set the offset
        );

        nestedArrayEquality([...results_1.results], results.complex_example_2.slice(4));

        const results_2 = generateSchedules(
            [courses.cs3000_202210(), courses.eece2323_202210()],
            new FilterBuilder().build(),
            results.complex_example_2[results.complex_example_2.length - 1] // Set the offset
        );

        nestedArrayEquality([...results_2.results], results.complex_example_2.slice(-1));
    });

    test("Complex example #3", () => {
        const results_1 = generateSchedules(
            [courses.cs3000_202210(), courses.eece2323_202210(), courses.eece2322_202210()],
            new FilterBuilder().build()
        );

        nestedArrayEquality([...results_1.results], results.complex_example_3);
    });

    test("Remove filtered courses", () => {
        const results = generateCombinations([courses.cs3000_202210_parsed().sections, []], filter);

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
            results: (function* () {})(),
            sections: [],
            courses: [],
        });
    });

    test("Conflict with days", () => {
        const result_1 = generateSchedules(
            [courses.cs3800_202210()],
            new FilterBuilder().setSpecificDaysFree([MeetingDay.TUESDAY]).build()
        );
        expect([...result_1.results]).toEqual([]);
    });

    test("Make sure all sections are listed & unparsed", () => {
        const course_list = [courses.cs3800_202210(), courses.cs3000_202210()];
        const filter = new FilterBuilder().setStartTime(36_000).build();
        const results = generateSchedules(course_list, filter);

        expect(results.sections.sort()).toEqual([
            {
                ...sections.cs3800_202210_1(),
                subject: "CS", 
                class: "CS3800",
                classId: "3800",
                timestamp_meetings: parseMeetingsToTimestamps(sections.cs3800_202210_1().meetings),
            },
            {
                ...sections.cs3800_202210_2(),
                class: "CS3800",
                classId: "3800",
                subject: "CS",
                timestamp_meetings: parseMeetingsToTimestamps(sections.cs3800_202210_2().meetings),
            },
            {
                ...sections.cs3000_202210_1(),
                class: "CS3000",
                classId: "3000",
                subject: "CS", 
                timestamp_meetings: parseMeetingsToTimestamps(sections.cs3000_202210_1().meetings),
            },
            {
                ...sections.cs3000_202210_2(),
                class: "CS3000",
                classId: "3000",
                subject: "CS",
                timestamp_meetings: parseMeetingsToTimestamps(sections.cs3000_202210_2().meetings),
            },
            {
                ...sections.cs3000_202210_3(),
                class: "CS3000",
                classId: "3000",
                subject: "CS",
                timestamp_meetings: parseMeetingsToTimestamps(sections.cs3000_202210_3().meetings),
            },
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

    test("Simple incrementer", () => {
        const indexes = [0, 0, 0];
        const sizes = [1, 2, 2];

        expect(indexes).toEqual([0, 0, 0]);
        expect(incrementIndexesOverflow(indexes, sizes)).toBeFalsy();
        expect(indexes).toEqual([0, 0, 1]);
        expect(incrementIndexesOverflow(indexes, sizes)).toBeFalsy();
        expect(indexes).toEqual([0, 1, 0]);
        expect(incrementIndexesOverflow(indexes, sizes)).toBeFalsy();
        expect(indexes).toEqual([0, 1, 1]);
        expect(incrementIndexesOverflow(indexes, sizes)).toBeTruthy();
    });

    test("Incrementer with skips", () => {
        const indexes = [0, 0, 0];
        const sizes = [2, 2, 2];

        expect(indexes).toEqual([0, 0, 0]);
        expect(incrementIndexesOverflow(indexes, sizes)).toBeFalsy();
        expect(indexes).toEqual([0, 0, 1]);
        expect(incrementIndexesOverflow(indexes, sizes)).toBeFalsy();
        expect(indexes).toEqual([0, 1, 0]);
        expect(incrementIndexesOverflow(indexes, sizes, 1)).toBeFalsy();
        expect(indexes).toEqual([1, 0, 0]);
        expect(incrementIndexesOverflow(indexes, sizes)).toBeFalsy();
        expect(indexes).toEqual([1, 0, 1]);
        expect(incrementIndexesOverflow(indexes, sizes)).toBeFalsy();
        expect(indexes).toEqual([1, 1, 0]);
        expect(incrementIndexesOverflow(indexes, sizes, 1)).toBeTruthy();
    });
});
