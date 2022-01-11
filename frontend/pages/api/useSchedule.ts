import { NextRouter } from "next/router";
import { GenerateScheduleQuery, GenerateScheduleQueryVariables } from "../../generated/graphql";
import {
    CourseWithoutSections,
    Results,
    SectionWithCourse,
    useScheduleType,
} from "../../types/types";
import { gqlClient } from "./apiClient";
import useSWRInfinite from "swr/infinite";

/**
 * Takes an unknown type, and returns it IF it is a string (otherwise, returns undefined)
 */
function parseQueryString(query: unknown): string | undefined {
    if (typeof query === "string") {
        return query;
    }
    return undefined;
}

function parseQueryInt(query: unknown): number | undefined {
    const parsed = parseQueryString(query);

    return parsed === undefined ? undefined : parseInt(parsed);
}
/**
 * Query the API based on the URL parameters.
 * We do basic type checking here, but no validation (leave that for the backend, just make sure we send correct types)
 */
export function parseVarsFromQuery(query: NextRouter["query"]): GenerateScheduleQueryVariables {
    // Parse the courses
    let courses;
    const raw_courses = query["courses"];
    if (raw_courses === undefined) {
        throw Error("No courses specified - please select some courses and try again");
    }
    // Only one course was specified - isn't going to be much of a schedule, but we'll allow it
    else if (typeof raw_courses === "string") {
        courses = raw_courses.split(",");
    } else {
        courses = raw_courses;
    }

    // Parse the term ID
    const term_id = query["term-id"];
    if (term_id === undefined) {
        throw Error("No term ID specified");
    } else if (Array.isArray(term_id)) {
        throw Error("Term ID cannot be an array");
    }

    // Parse any specific days free
    let filter_days_free;
    let filter_days_free_raw = query["specific-days-free"];

    if (typeof filter_days_free_raw === "string") {
        filter_days_free = [filter_days_free_raw];
    } else if (Array.isArray(filter_days_free_raw)) {
        filter_days_free = filter_days_free_raw as string[];
    } else {
        filter_days_free = [] as string[];
    }

    return {
        courses,
        termId: term_id,
        filterDaysFree: filter_days_free,
        // For the rest - they can either be a string or undefined, we don't care which one
        filterStartTime: parseQueryString(query["start-time"]),
        filterEndTime: parseQueryString(query["end-time"]),
        filterMinNumDaysFree: parseQueryInt(query["min-days-free"]),
        filterMinSeatsLeft: parseQueryInt(query["min-seats-left"]),
        filterMinHonors: parseQueryInt(query["min-honors-courses"]),
    };
}

export function useSchedule(router: NextRouter): useScheduleType {
    const getKey = (pageIndex: number, prevPageData: Results): string | null => {
        if (!router.isReady) {
            return null; // Don't return until ready
        }

        const offset = prevPageData === null ? undefined : prevPageData.nextPageOffset;
        return JSON.stringify({ ...parseVarsFromQuery(router.query), offset });
    };

    const { data, error, size, setSize } = useSWRInfinite(
        getKey,
        async (params): Promise<Results> => {
            const parsed_params = JSON.parse(params) as GenerateScheduleQueryVariables;

            const results = await gqlClient.generateSchedule(parsed_params);
            return transformGraphQLToSchedule(results);
        }
    );

    if (data === undefined) {
        return {
            loaded: false,
            error,
            courses: {},
            sections: {},
            hasNextPage: false,
            results: [],
            loadMore: () => setSize(size + 1),
        };
    }

    const results = data.map((r) => r.results).flat();
    const hasNextPage = data.every((r) => r.nextPageOffset !== undefined);

    return {
        results,
        error,
        hasNextPage,
        loaded: true,
        courses: data[0].courses,
        sections: data[0].sections,
        loadMore: () => setSize(size + 1),
    };
}

/**
 * Converts the GraphQL result to our Result type.
 */
function transformGraphQLToSchedule(gql: GenerateScheduleQuery): Results {
    const gql_results = gql.generateSchedule;
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
        nextPageOffset: gql_results.offset === null ? undefined : gql_results.offset,
    };
}
