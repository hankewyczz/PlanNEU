import { GraphQLClient } from "graphql-request";
import { GenerateScheduleQuery, getSdk } from "../../generated/graphql";
import { CourseWithoutSections, Results, ResultStats, SectionWithCourse } from "../../types/types";

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
function parseApiResults(gql_results: GenerateScheduleQuery["generateSchedule"]): Results {
    // Create a section mapping - CRN to section
    const section_mapping: Record<string, SectionWithCourse> = {};
    gql_results.sections.forEach((sec) => (section_mapping[sec.crn] = sec));

    // Create a course mapping - subject & classId to a section
    const course_mapping: Record<string, CourseWithoutSections> = {};
    gql_results.courses.forEach((c) => (course_mapping[`${c.subject}${c.classId}`] = c));

    return {
        courses: course_mapping,
        results: gql_results.results,
        sections: section_mapping,
        stats: gql_results.stats,
    };
}
