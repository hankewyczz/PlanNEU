import { Course } from "../../../types/types";
import { parseCourse } from "../parseCourse"
import data from "./data/courses.data"

describe("Test course parser", () => {
    test("Single course parsing", () => {
        const copy: Course = {...data.cs3000_202210};
        expect(parseCourse(copy)).toMatchObject(data.cs3000_202210_parsed());
    })
})