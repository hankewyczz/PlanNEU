import { Course } from "../../types/types";
import { gqlClient } from "./apiClient";

export async function getClass(subject: string, classId: string, termId: string): Promise<Course | null> {
    const course = (await gqlClient.getClass({subject, classId, termId})).class;
    if (course?.occurrence) {
        return null;
    }
    else {
        return course?.occurrence as Course;
    }
}

export async function getSection(subject: string, classId: string, termId: string, crn: string): Promise<Course | null> {
    const course = await getClass(subject, classId, termId);

    if (course !== null) {
        // Filter out all sections but this one
        course.sections = course.sections.filter(sec => sec.crn === crn);
    }

    return course;
}