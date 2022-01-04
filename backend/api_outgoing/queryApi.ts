import { Course } from "../types/types";
import { gqlClient } from "./apiClient";

/**
 * Gets a Course from the API
 * @param subject The subject of the course
 * @param classId The class ID of the course
 * @param termId The termID from which we want to get this course
 * @returns A Course, or an error
 */
export async function getCourse(
    subject: string,
    classId: string,
    termId: string
): Promise<Course | never> {
    subject = subject.toUpperCase();
    const course = (await gqlClient.getCourse({ subject, classId, termId })).class;

    if (!course?.occurrence) {
        throw Error(`No course matching "${subject}${classId}" for termId "${termId}"`);
    } else {
        return course?.occurrence as Course;
    }
}

/**
 * Gets a Section from the API
 * @param subject The subject of the class
 * @param classId The class ID
 * @param crn The CRN of the desired section
 * @param termId The term from which we want to find this section
 * @returns A Course, with the only section being the one matching the `crn`
 */
export async function getSection(
    subject: string,
    classId: string,
    crn: string,
    termId: string
): Promise<Course | never> {
    try {
        const course = await getCourse(subject, classId, termId);
        const sections = course.sections.filter((sec) => sec.crn === crn);

        if (sections.length === 0) {
            throw Error(`No section matching "${subject}${classId}/${crn}"`);
        }
        course.sections = sections;
        return course;
    } catch (err) {
        throw err;
    }
}
