import {Course, MinimalSection, ParsedCourse, ParsedSection} from "../../types/types";
import { parseSection } from "./parseSection";


export function parseCourses(courses: Course[]): ParsedCourse[] {
    return courses.map(c => parseCourse(c));
}


/**
 * Parses a Course to a ParsedCourse IN PLACE (ie. mutates the passed course)
 */
export function parseCourse(course: Course): ParsedCourse {
    return {...course, "sections": course.sections.map(s => parseSection(s))}
}

export function minCourses(courses: ParsedCourse[]): MinimalSection[][] {
    return courses.map(c => minCourse(c));
}

export function minCourse(course: ParsedCourse): MinimalSection[] {
    return course.sections.map(s => {
        return {
            "crn": s.crn,
            "meetings": s.meetings,
        }
    });
}