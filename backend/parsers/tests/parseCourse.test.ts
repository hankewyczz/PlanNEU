import { parseBackendMeetings, parseCourse, parseCourses, parseSection } from "../parseCourse";
import data from "./data/courses.data";
import sections from "./data/sections.data";

describe("Test course parser", () => {
    test("Course with no sections", () => {
        expect(parseCourse({ ...data.course_with_no_sections })).toMatchObject(
            data.course_with_no_sections
        );
    });

    test("Single course parsing", () => {
        expect(parseCourse(data.cs3000_202210())).toMatchObject(data.cs3000_202210_parsed());
        expect(parseCourse(data.cs3800_202210())).toMatchObject(data.cs3800_202210_parsed());
        expect(parseCourse(data.cs3001_202210())).toMatchObject(data.cs3001_202210_parsed());
        expect(parseCourse(data.cs2800_202210())).toMatchObject(data.cs2800_202210_parsed());
        expect(parseCourse(data.cs2801_202210())).toMatchObject(data.cs2801_202210_parsed());
        expect(parseCourse(data.eece2323_202210())).toMatchObject(data.eece2323_202210_parsed());
        expect(parseCourse(data.eece2322_202210())).toMatchObject(data.eece2322_202210_parsed());
    });

    test("Multiple courseS", () => {
        expect(
            parseCourses([
                data.cs2800_202210(),
                data.cs2801_202210(),
                data.eece2323_202210(),
                data.eece2322_202210(),
            ])
        ).toMatchObject([
            data.cs2800_202210_parsed(),
            data.cs2801_202210_parsed(),
            data.eece2323_202210_parsed(),
            data.eece2322_202210_parsed(),
        ]);
    });
});

describe("Parse sections", () => {
    test("Sections parse properly", () => {
        // Algo
        expect(parseSection(sections.cs3000_202210_1())).toMatchObject(
            sections.cs3000_202210_1_parsed()
        );
        expect(parseSection(sections.cs3000_202210_2())).toMatchObject(
            sections.cs3000_202210_2_parsed()
        );
        expect(parseSection(sections.cs3000_202210_3())).toMatchObject(
            sections.cs3000_202210_3_parsed()
        );
        // Theory of comp
        expect(parseSection(sections.cs3800_202210_1())).toMatchObject(
            sections.cs3800_202210_1_parsed()
        );
        expect(parseSection(sections.cs3800_202210_2())).toMatchObject(
            sections.cs3800_202210_2_parsed()
        );
        // Algo recitation
        expect(parseSection(sections.cs3001_202210_1())).toMatchObject(
            sections.cs3001_202210_1_parsed()
        );
        expect(parseSection(sections.cs3001_202210_2())).toMatchObject(
            sections.cs3001_202210_2_parsed()
        );
        expect(parseSection(sections.cs3001_202210_3())).toMatchObject(
            sections.cs3001_202210_3_parsed()
        );
        expect(parseSection(sections.cs3001_202210_4())).toMatchObject(
            sections.cs3001_202210_4_parsed()
        );
        expect(parseSection(sections.cs3001_202210_5())).toMatchObject(
            sections.cs3001_202210_5_parsed()
        );
        expect(parseSection(sections.cs3001_202210_6())).toMatchObject(
            sections.cs3001_202210_6_parsed()
        );
        expect(parseSection(sections.cs3001_202210_7())).toMatchObject(
            sections.cs3001_202210_7_parsed()
        );
        expect(parseSection(sections.cs3001_202210_8())).toMatchObject(
            sections.cs3001_202210_8_parsed()
        );
        expect(parseSection(sections.cs3001_202210_9())).toMatchObject(
            sections.cs3001_202210_9_parsed()
        );
        // Logic and comp
        expect(parseSection(sections.cs2800_202210_1())).toMatchObject(
            sections.cs2800_202210_1_parsed()
        );
        expect(parseSection(sections.cs2800_202210_2())).toMatchObject(
            sections.cs2800_202210_2_parsed()
        );
        expect(parseSection(sections.cs2800_202210_3())).toMatchObject(
            sections.cs2800_202210_3_parsed()
        );
        // Logic and comp lab
        expect(parseSection(sections.cs2801_202210_1())).toMatchObject(
            sections.cs2801_202210_1_parsed()
        );
        expect(parseSection(sections.cs2801_202210_2())).toMatchObject(
            sections.cs2801_202210_2_parsed()
        );
        expect(parseSection(sections.cs2801_202210_3())).toMatchObject(
            sections.cs2801_202210_3_parsed()
        );
        expect(parseSection(sections.cs2801_202210_4())).toMatchObject(
            sections.cs2801_202210_4_parsed()
        );

        // fundamentals of digital design lab
        expect(parseSection(sections.eece2323_202210_1())).toMatchObject(
            sections.eece2323_202210_1_parsed()
        );
        expect(parseSection(sections.eece2323_202210_2())).toMatchObject(
            sections.eece2323_202210_2_parsed()
        );
        expect(parseSection(sections.eece2323_202210_3())).toMatchObject(
            sections.eece2323_202210_3_parsed()
        );
        expect(parseSection(sections.eece2323_202210_4())).toMatchObject(
            sections.eece2323_202210_4_parsed()
        );
        expect(parseSection(sections.eece2323_202210_5())).toMatchObject(
            sections.eece2323_202210_5_parsed()
        );
        expect(parseSection(sections.eece2323_202210_6())).toMatchObject(
            sections.eece2323_202210_6_parsed()
        );
        expect(parseSection(sections.eece2323_202210_7())).toMatchObject(
            sections.eece2323_202210_7_parsed()
        );

        // fundamentals of digital design
        expect(parseSection(sections.eece2322_202210_1())).toMatchObject(
            sections.eece2322_202210_1_parsed()
        );
        expect(parseSection(sections.eece2322_202210_2())).toMatchObject(
            sections.eece2322_202210_2_parsed()
        );
        expect(parseSection(sections.eece2322_202210_3())).toMatchObject(
            sections.eece2322_202210_3_parsed()
        );
        expect(parseSection(sections.eece2322_202210_4())).toMatchObject(
            sections.eece2322_202210_4_parsed()
        );
        expect(parseSection(sections.eece2322_202210_5())).toMatchObject(
            sections.eece2322_202210_5_parsed()
        );
        expect(parseSection(sections.cs4850_202210_1())).toMatchObject(
            sections.cs4850_202210_1_parsed()
        );
    });

    test("Overlapping meetings", () => {
        expect(() => parseBackendMeetings(sections.overlapping_meetings)).toThrow();
    });
});
