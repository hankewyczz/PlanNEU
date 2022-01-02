import { GraphQLClient } from "graphql-request";
import { GenerateScheduleQuery, getSdk } from "../../generated/graphql";
import {
    CourseWithoutSections,
    Results,
    ResultStats,
    SectionWithCourse,
} from "../../types/types";

export const gqlClient = getSdk(new GraphQLClient("http://localhost:4001"));

/**
 * Sends an API request to generate the schedule, and parses the results.
 */
export async function generateSchedule(
    courses: string[],
    termId: string,
    filterDaysFree: string[] = [],
    filterStartTime?: string | undefined,
    filterEndTime?: string | undefined,
    filterMinNumDaysFree?: string | undefined,
    filterMinSeatsLeft?: string | undefined,
    filterMinHonors?: string | undefined
): Promise<Results | never> {
    try {
        console.log("Sending API request...");
        const results = await gqlClient.generateSchedule({
            courses,
            termId,
            filterDaysFree,
            filterStartTime,
            filterEndTime,
            filterMinNumDaysFree,
            filterMinSeatsLeft,
            filterMinHonors,
        });
        console.log("Recieved response");

        if (results.generateSchedule) {
            return parseApiResults(results.generateSchedule);
        }
    } catch (error) {
        //TODO - pass the error to the user
        console.error(error);
        throw error;
    }

    throw Error("No results were returned, and no error was thrown...");
}

/**
 * Converts the GraphQL result to our Result type.
 */
function parseApiResults(
    gql_results: GenerateScheduleQuery["generateSchedule"]
): Results {
    // Clean up the section data
    const raw_sections = gql_results?.sections;
    if (raw_sections === null || raw_sections === undefined) {
        throw Error(`sections cannot be undefined: ${raw_sections}`);
    }

    // Create a section mapping - CRN to section
    const section_mapping: Record<string, SectionWithCourse> = {};
    raw_sections
        .filter((c): c is SectionWithCourse => c !== null && c !== undefined)
        .forEach((sec) => (section_mapping[sec.crn] = sec));

    // Clean up course data
    const raw_courses = gql_results?.courses;
    if (raw_courses === null || raw_courses === undefined) {
        throw Error(`courses cannot be undefined: ${raw_courses}`);
    }
    const course_mapping: Record<string, CourseWithoutSections> = {};

    raw_courses
        .filter(
            (c): c is CourseWithoutSections => c !== null && c !== undefined
        )
        .forEach((c) => (course_mapping[`${c.subject}${c.classId}`] = c));

    return {
        courses: course_mapping,
        results: gql_results?.results as string[][],
        sections: section_mapping,
        stats: gql_results?.stats as ResultStats,
    };
}
