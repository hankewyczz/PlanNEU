import { BinaryMeetingTime } from "../parsers/meetingTimes";

export type CourseHash = {
    subject: string;
    classId: string;
};
export type SectionHash = {
    subject: string;
    classId: string;
    crn: string;
};

function validSubjectAndId(subject: string, classId: string): boolean {
    return /^[a-zA-Z]*$/.test(subject) && /^[0-9]{4}$/.test(classId);
}

export function isCourseHash(str: string): false | CourseHash {
    const parts = str.split("/");

    if (parts.length !== 2) {
        return false;
    }

    if (!validSubjectAndId(parts[0], parts[1])) {
        return false;
    }

    return {
        subject: parts[0],
        classId: parts[1],
    };
}

export function isSectionHash(str: string): false | SectionHash {
    const parts = str.split("/");

    if (parts.length !== 3) {
        return false;
    }

    if (!validSubjectAndId(parts[0], parts[1])) {
        return false;
    }

    if (!/^[0-9]*$/.test(parts[2])) {
        return false;
    }

    return {
        subject: parts[0],
        classId: parts[1],
        crn: parts[2],
    };
}

export interface Course {
    termId: string;
    subject: string;
    classId: string;
    name: string;
    coreqs: Requisite;
    sections: Section[];
}

export type CourseWithoutSections = Omit<Course, "sections">;

// The same as a course, but with parsed sections
export type ParsedCourse = CourseWithoutSections &
    Record<"sections", ParsedSection[]>;

export type Requisite = string | BooleanReq | CourseReq;

export interface BooleanReq {
    type: "and" | "or";
    values: Requisite[];
}

export interface CourseReq {
    classId: string;
    subject: string;
    missing?: true;
}

// A section of a course
export interface Section {
    classType: string;
    crn: string;
    seatsCapacity: number;
    seatsRemaining: number;
    waitCapacity: number;
    waitRemaining: number;
    lastUpdateTime: number;
    campus: string;
    honors: boolean;
    url: string;
    profs: string[];
    meetings: BackendMeeting[];
}

export interface SectionWithCourse extends Section {
    classId: string;
}

// The same as a section, but with parsed meetings
export type ParsedSection = Omit<Section, "meetings"> &
    Record<"meetings", BinaryMeetingTime>;

// A list of CRNs of the sections
export type CRNsResult = string[];

export interface ResultStats {
    numCombinations: number;
    time: number;
}

export interface Results {
    courses: CourseWithoutSections[];
    sections: SectionWithCourse[];
    results: CRNsResult[];
    stats: ResultStats;
}

export interface BackendMeeting {
    startDate: number; // Number of days since epoch
    endDate: number;
    where: string;
    type: string;
    times: MeetingTimes;
}

// TODO - are there ever any Saturday/Sunday classes
// We compare the meeting times n! times, so any reduction in problem space translates to very real optimiations
export enum MeetingDay {
    SUNDAY = "0",
    MONDAY = "1",
    TUESDAY = "2",
    WEDNESDAY = "3",
    THURSDAY = "4",
    FRIDAY = "5",
    SATURDAY = "6",
}

/**
 * Converts a string/number to a MeetingDay
 * @param input A string or a number corresponding to a MeetingDay
 * @returns The correspnding MeetingDay
 */
export function toMeetingDay(input: string | number): MeetingDay {
    if (typeof input === "number") {
        input = input.toString();
    }

    switch (input) {
        case "0":
            return MeetingDay.SUNDAY;
        case "1":
            return MeetingDay.MONDAY;
        case "2":
            return MeetingDay.TUESDAY;
        case "3":
            return MeetingDay.WEDNESDAY;
        case "4":
            return MeetingDay.THURSDAY;
        case "5":
            return MeetingDay.FRIDAY;
        case "6":
            return MeetingDay.SATURDAY;
    }

    throw Error(`Unknown MeetingDay: ${input}`);
}

export type MeetingTimes = Partial<Record<MeetingDay, MeetingTime[]>>;

// A single meeting time, ex: "9:50-11:30am"
export interface MeetingTime {
    start: number;
    end: number;
}
