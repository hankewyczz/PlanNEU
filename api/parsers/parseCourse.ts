import {Course, MinimalSection, ParsedCourse, ParsedSection} from "../../types/types";
import { parseSection } from "./parseSection";


export function parseCourses(courses: Course[]): ParsedCourse[] {
    return courses.map(c => parseCourse(c));
}


/**
 * Parses a Course to a ParsedCourse IN PLACE (ie. mutates the passed course)
 */
export function parseCourse(course: Course): ParsedCourse {
    const parsedSections = course.sections?.map(s => parseSection(s));
    const sections = (parsedSections) ? parsedSections : [];

    return {...course, "sections": sections}
}

export function minCourses(courses: ParsedCourse[]): MinimalSection[][] {
    const allSections: MinimalSection[][] = [];

    for (const course of courses) {
        const courseSections: MinimalSection[] = course.sections.map(s => {
            return {
                "crn": s.crn,
                "meetings": s.meetings,
            }
        });
        allSections.push(courseSections)
    }

    return allSections
}