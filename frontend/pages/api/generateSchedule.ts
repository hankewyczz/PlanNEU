import { generateSchedule } from "./apiClient";
import { Results } from "../../types/types";

/**
 * Takes an unknown type, and returns it IF it is a string (otherwise, returns undefined)
 */
function parseQueryString(query: unknown): string | undefined {
    if (typeof query === "string") {
        return query
    }
    return undefined
}

function parseQueryInt(query: unknown): number | undefined {
    const parsed = parseQueryString(query);

    return parsed === undefined ? undefined : parseInt(parsed);
}
/**
 * Query the API based on the URL parameters.
 * We do basic type checking here, but no validation (leave that for the backend, just make sure we send correct types)
 */
export async function generateScheduleFromQuery(
    query: Record<string, string | string[] | undefined>
): Promise<Results | never> {
    // Parse the courses
    let courses;
    const raw_courses = query["courses"];
    if (raw_courses === undefined) {
        throw Error("No courses specified")
    }
    // Only one course was specified - isn't going to be much of a schedule, but we'll allow it
    else if (typeof raw_courses === "string") {
        courses = raw_courses.split(","); 
    }
    else {
        courses = raw_courses;
    }

    // Parse the term ID
    const term_id = query["term-id"];
    if (term_id === undefined) {
        throw Error("No term ID specified")
    }
    else if (Array.isArray(term_id)) {
        throw Error("Term ID cannot be an array")
    }

    // Parse any specific days free
    let filter_days_free;
    let filter_days_free_raw = query["specific-days-free"]
    
    if (typeof filter_days_free_raw === "string") {
        filter_days_free = [filter_days_free_raw];
    } 
    else if (Array.isArray(filter_days_free_raw)) {
        filter_days_free = filter_days_free_raw as string[];
    }
    else {
        filter_days_free = [] as string[];
    }

    return await generateSchedule(
        courses,
        term_id,
        filter_days_free,
        // For the rest - they can either be a string or undefined, we don't care which one
        parseQueryString(query["start-time"]),
        parseQueryString(query["end-time"]),
        parseQueryInt(query["min-days-free"]),
        parseQueryInt(query["min-seats-left"]),
        parseQueryInt(query["min-honors-courses"])
    )
}