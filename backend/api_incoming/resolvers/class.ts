import { parseCourses } from "../../api_outgoing/parsers/parseCourse";
import { getCourse, getSection } from "../../api_outgoing/query/queryApi";
import { FilterBuilder } from "../../filters/filter";
import { generateResults } from "../../generator/generateResults";
import { Course, isCourseHash, isSectionHash, MeetingDay } from "../../types/types";

async function hashToCourse(hash: string, termId: string): Promise<Course | null> {
    const course = isCourseHash(hash);

    if (course) {
        return await getCourse(course.subject, course.classId, termId);
    }
    else {
        const section = isSectionHash(hash)
        if (section) {
            return await getSection(section.subject, section.classId, termId, section.crn);
        }
    }

    return null
}


const getResults = async (
    courses: string[],
    termId: string,
    filterStartTime: number | null,
    filterEndTime: number | null,
    filterDaysFree: MeetingDay[] = [],
    filterMinNumDaysFree: number | null,
    filterMinSeatsLeft: number | null,
    filterMinHonors: number | null
) => {
    const start = new Date();
    const filter = new FilterBuilder()
        .setStartTime(filterStartTime)
        .setEndTime(filterEndTime)
        .setSpecificDaysFree(filterDaysFree)
        .setMinDaysFree(filterMinNumDaysFree)
        .setSeatsLeft(filterMinSeatsLeft)
        .setMinHonorsCourses(filterMinHonors)
        .build();

    
    const course_objs: (Course | null)[] = await Promise.all(courses.map(hash => hashToCourse(hash, termId)));


    const filtered_courses = course_objs.filter(c => c !== null && c !== undefined) as Course[];    
    const results = generateResults(filtered_courses, filter);
    results.stats.time = new Date().getTime() - start.getTime();
    return results;
};

const resolvers = {
    Query: {
        generateResults: (parent: any, args: any) => {
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
