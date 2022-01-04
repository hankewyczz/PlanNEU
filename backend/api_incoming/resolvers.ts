import { getCourse, getSection } from "../api_outgoing/queryApi";
import { FilterBuilder } from "../filters/filter";
import { generateSchedules } from "../generate_schedules/generateSchedules";
import { Course, isCourseHash, isSectionHash, Results, toMeetingDay } from "../types/types";

/**
 * Converts a string-based hash to a Course
 * @param hash A course or section hash
 * @param termId The term ID for which we want to fetch this course/section
 * @returns The course/section, or an error
 */
async function hashToCourse(hash: string, termId: string): Promise<Course | never> {
    const course = isCourseHash(hash);
    const section = isSectionHash(hash);

    if (course) {
        return await getCourse(course.subject, course.classId, termId);
    } else if (section) {
        return await getSection(section.subject, section.classId, section.crn, termId);
    }

    throw Error(`'${hash}': is not recognized as a valid course/section hash`);
}

// Returns time in seconds
function stringToTime(time: string | undefined): number | undefined {
    if (time === undefined || time.length !== 4) {
        return undefined;
    }

    const times = time.split(":");
    if (times.length !== 2 && times[0].length !== 2) {
        return undefined;
    }

    const hours = Number.parseInt(times[0]);
    const minutes = Number.parseInt(times[1]);
    return hours * (60 * 60) + minutes * 60;
}

/**
 * 
 * @param courses A list of hashes representing a Course or a Section
 * @param termId The termID for which we generate this schedule
 * @param filterStartTime A minimum start time, in seconds  
 * @param filterEndTime A maximum end time, in seconds
 * @param filterDaysFree An array of specific days which should not have any meetings scheudled
 * @param filterMinNumDaysFree The minimum number of days which should have no meetings
 * @param filterMinSeatsLeft The minimum number of seats left in each section in a schedule
 * @param filterMinHonors The minimum number of sections which are honors in a schedule
 * @returns Schedule results
 */
async function apiGenerateSchedule(
    courses: string[],
    termId: string,
    filterStartTime: string | undefined,
    filterEndTime: string | undefined,
    filterDaysFree: string[] = [],
    filterMinNumDaysFree: number | undefined,
    filterMinSeatsLeft: number | undefined,
    filterMinHonors: number | undefined
): Promise<Results> {
    const start = new Date();
    // Fixing the input
    const meeting_days = filterDaysFree.map((day) => toMeetingDay(day));

    const filter = new FilterBuilder()
        .setStartTime(stringToTime(filterStartTime))
        .setEndTime(stringToTime(filterEndTime))
        .setSpecificDaysFree(meeting_days)
        .setMinDaysFree(filterMinNumDaysFree)
        .setSeatsLeft(filterMinSeatsLeft)
        .setMinHonorsCourses(filterMinHonors)
        .build();

    const course_objs = await Promise.all(
        courses.map((hash) => {
            // Propagate the error
            try {
                return hashToCourse(hash, termId);
            } catch (err) {
                throw err;
            }
        })
    );

    const results = generateSchedules(course_objs, filter);
    results.stats.time = new Date().getTime() - start.getTime();
    return results;
}

const resolvers = {
    Query: {
        generateSchedule: (parent: any, args: any) => {
            return apiGenerateSchedule(
                args.courses,
                args.termId,
                args.filterStartTime,
                args.filterEndTime,
                args.filterDaysFree,
                args.filterMinNumDaysFree,
                args.filterMinSeatsLeft,
                args.filterMinHonors
            );
        },
    },
};

export default resolvers;
