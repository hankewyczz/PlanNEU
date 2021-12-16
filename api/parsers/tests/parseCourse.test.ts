import { Course } from "../../../types/types";
import { minCourse, parseCourse } from "../parseCourse"
import data from "./data/courses.data"

describe("Test course parser", () => {
    test("Single course parsing", () => {
        expect(parseCourse(data.cs3000_202210())).toMatchObject(data.cs3000_202210_parsed());
    })

    test("Course with no sections", () => {
        expect(parseCourse({...data.cs3800_no_sections})).toMatchObject(data.cs3800_no_sections);
    })

    test("minCourses", () => {
        const copy = parseCourse(data.cs3000_202210());
        expect(minCourse(copy)).toMatchObject(data.cs3000_202210_min_sections)

    })
})