import { getCourse, getSection } from "../api_outgoing/queryApi";
import { FilterBuilder } from "../filters/filter";
import { generateSchedules } from "../generate_schedules/generateSchedules";
import { Course, isCourseHash, isSectionHash, Results, toMeetingDay } from "../types/types";
import { MAX_NUM_RESULTS } from "../utils/global";

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

/**
 * Converts a time string to seconds
 * @param time A time (hours and minutes), in 24-hour time, separated by a color
 * @returns The number of seconds this time represents
 */
export function stringToTime(time: string | undefined): number | undefined {
    if (time === undefined || time.length !== 5) {
        return undefined;
    }

    const times = time.split(":");
    if (times.length !== 2 || times[0].length !== 2) {
        return undefined;
    }

    // As long as it's formatted correctly, we don't care what the hour/minute values are
    // You want "-1:61" in seconds? Order up
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
    filterMinHonors: number | undefined,
    offset: string[] | undefined
): Promise<Results> {
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

    const results_generator = generateSchedules(course_objs, filter, offset);

    

    // Return some entries, and note if we have a next page
    const results_array = [];
    for (let i = 0; i < MAX_NUM_RESULTS; i++) {
        const next = results_generator.results.next();
        if (next.done) {
            return { ...results_generator, results: results_array };
        }

        results_array.push(next.value);
    }

    // Once we've gotten however many we wanted, we do a final check to see if there's a last page
    // However, we can't do this without actually getting the next object
    // So we get it, store it as the offset, and DON'T return it this time
    const next = results_generator.results.next();
    if (next.done) {
        return { ...results_generator, results: results_array };
    }
    else {
        return { ...results_generator, results: results_array, offset: next.value };
    }

    
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
                args.filterMinHonors,
                args.offset
            );
        },
    },
};

export default resolvers;
