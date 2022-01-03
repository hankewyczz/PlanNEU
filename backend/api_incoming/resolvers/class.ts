import { parseCourses } from "../../parsers/parseCourse";
import { getCourse, getSection } from "../../api_outgoing/query/queryApi";
import { FilterBuilder } from "../../filters/filter";
import { generateResults } from "../../generator/generateResults";
import {
    Course,
    isCourseHash,
    isSectionHash,
    MeetingDay,
} from "../../types/types";

async function hashToCourse(
    hash: string,
    termId: string
): Promise<Course | never> {
    const course = isCourseHash(hash);
    let result: Course | null = null;

    if (course) {
        result = await getCourse(course.subject, course.classId, termId);
    } else {
        const section = isSectionHash(hash);
        if (section) {
            result = await getSection(
                section.subject,
                section.classId,
                termId,
                section.crn
            );
        }
    }

    if (result === null) {
        throw Error(`We couldn't find a course/section matching "${hash}" for termId "${termId}"`)
    }

    return result
}

// Returns time in seconds
function stringToTime(time: string | undefined): number | null {
    if (time === undefined || time.length !== 4) {
        return null;
    }

    const times = time.split(":");
    if (times.length !== 2 && times[0].length !== 2) {
        return null;
    }

    const hours = Number.parseInt(times[0]);
    const minutes = Number.parseInt(times[1]);
    return hours * (60 * 60) + minutes * 60;
}

function abbrToMeetingDay(day: string): MeetingDay | null {
    const standardized_day = day.toUpperCase().slice(0, 3);
    switch (standardized_day) {
        case "SUN":
            return MeetingDay.SUNDAY;
        case "MON":
            return MeetingDay.MONDAY;
        case "TUE":
            return MeetingDay.TUESDAY;
        case "WED":
            return MeetingDay.WEDNESDAY;
        case "THU":
            return MeetingDay.THURSDAY;
        case "FRI":
            return MeetingDay.FRIDAY;
        case "SAT":
            return MeetingDay.SATURDAY;
    }
    return null;
}

function parseIntNull(num: string | undefined): number | null {
    if (num === undefined) {
        return null;
    }
    return Number.parseInt(num);
}


const getResults = async (
    courses: string[],
    termId: string,
    filterStartTime: string | undefined,
    filterEndTime: string | undefined,
    filterDaysFree: string[] = [],
    filterMinNumDaysFree: string | undefined,
    filterMinSeatsLeft: string | undefined,
    filterMinHonors: string | undefined
) => {
    const start = new Date();
    // Fixing the input
    const meeting_days = filterDaysFree
        .map((day) => abbrToMeetingDay(day))
        .filter((x) => x !== null) as MeetingDay[];

    const filter = new FilterBuilder()
        .setStartTime(stringToTime(filterStartTime))
        .setEndTime(stringToTime(filterEndTime))
        .setSpecificDaysFree(meeting_days)
        .setMinDaysFree(parseIntNull(filterMinNumDaysFree))
        .setSeatsLeft(parseIntNull(filterMinSeatsLeft))
        .setMinHonorsCourses(parseIntNull(filterMinHonors))
        .build();

    const course_objs = await Promise.all(
        courses.map((hash) => {
            // Propagate the error
            try {
                return hashToCourse(hash, termId)
            }
            catch (err) {
                throw err
            } 
        })
    );

    const results = generateResults(course_objs, filter);
    results.stats.time = new Date().getTime() - start.getTime();
    return results;
}; 

const resolvers = {
    Query: {
        generateSchedule: (parent: any, args: any) => {
            return getResults(
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
