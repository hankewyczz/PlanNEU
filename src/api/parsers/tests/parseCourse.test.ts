import { minCourse, parseCourse } from "../parseCourse";
import data from "./data/courses.data";

describe("Test course parser", () => {
  test("Course with no sections", () => {
    expect(parseCourse({ ...data.course_with_no_sections })).toMatchObject(
      data.course_with_no_sections
    );
  });

  test("Single course parsing", () => {
    expect(parseCourse(data.cs3000_202210())).toMatchObject(
      data.cs3000_202210_parsed()
    );
    expect(parseCourse(data.cs3800_202210())).toMatchObject(
      data.cs3800_202210_parsed()
    );
    expect(parseCourse(data.cs3001_202210())).toMatchObject(
      data.cs3001_202210_parsed()
    );
    expect(parseCourse(data.cs2800_202210())).toMatchObject(
      data.cs2800_202210_parsed()
    );
    expect(parseCourse(data.cs2801_202210())).toMatchObject(
      data.cs2801_202210_parsed()
    );
    expect(parseCourse(data.eece2323_202210())).toMatchObject(
      data.eece2323_202210_parsed()
    );
    expect(parseCourse(data.eece2322_202210())).toMatchObject(
      data.eece2322_202210_parsed()
    );
  });

  test("minCourses", () => {
    expect(minCourse(parseCourse(data.cs3000_202210()))).toMatchObject(
      data.cs3000_202210_min_sections
    );
    expect(minCourse(parseCourse(data.cs3800_202210()))).toMatchObject(
      data.cs3800_202210_min_sections
    );
    expect(minCourse(parseCourse(data.cs3001_202210()))).toMatchObject(
      data.cs3001_202210_min_sections
    );
    expect(minCourse(parseCourse(data.cs2800_202210()))).toMatchObject(
      data.cs2800_202210_min_sections
    );
    expect(minCourse(parseCourse(data.cs2801_202210()))).toMatchObject(
      data.cs2801_202210_min_sections
    );
    expect(minCourse(parseCourse(data.eece2323_202210()))).toMatchObject(
      data.eece2323_202210_min_sections
    );
    expect(minCourse(parseCourse(data.eece2322_202210()))).toMatchObject(
      data.eece2322_202210_min_sections
    );
  });
});
