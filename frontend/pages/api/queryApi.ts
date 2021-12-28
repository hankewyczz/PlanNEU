import { Results } from "../../generated/graphql";
import { Course } from "../../types/types";
import { gqlClient } from "./apiClient";

export async function generateSchedule(
    courses: string[],
    termId: string,
    filterDaysFree: string[] = [],
    filterStartTime?: string,
    filterEndTime?: string,
    filterMinNumDaysFree?: string | undefined,
    filterMinSeatsLeft?: string | undefined,
    filterMinHonors?: string | undefined
): Promise<Results> {
    const results = await gqlClient.generateSchedule(
        courses,
        termId,
        filterDaysFree,
        filterStartTime,
        filterEndTime,
        filterMinNumDaysFree,
        filterMinSeatsLeft,
        filterMinHonors
    );

    return results;
}
