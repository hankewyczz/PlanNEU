import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export interface useScheduleType {
    loaded: boolean;
    hasNextPage: boolean;
    error: any;
    courses: Record<string, CourseWithoutSections>;
    sections: Record<string, SectionWithCourse>;
    results: string[][];
    loadMore: () => void;
}
export interface Results {
    nextPageOffset?: string[];
    results: string[][];
    courses: Record<string, CourseWithoutSections>;
    sections: Record<string, SectionWithCourse>;
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

type TimestampMeeting = {
    start: number;
    end: number;
};

export interface SectionWithCourse extends Section {
    class: string;
    subject: string;
    classId: string;
    timestamp_meetings: TimestampMeeting[]; 
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

export function meetingDayToString(day: MeetingDay): string {
    switch (day) {
        case MeetingDay.SUNDAY:
            return "Sunday";
        case MeetingDay.MONDAY:
            return "Monday";
        case MeetingDay.TUESDAY:
            return "Tuesday";
        case MeetingDay.WEDNESDAY:
            return "Wednesday";
        case MeetingDay.THURSDAY:
            return "Thursday";
        case MeetingDay.FRIDAY:
            return "Friday";
        case MeetingDay.SATURDAY:
            return "Saturday";
    }
}

export type MeetingTimes = Partial<Record<MeetingDay, MeetingTime[]>>;

// A single meeting time, ex: "9:50-11:30am"
export interface MeetingTime {
    start: number;
    end: number;
}

dayjs.extend(utc);
export function meetingToString(meeting: MeetingTime): string {
    const start = dayjs.utc(meeting.start * 1000).format("h:mm");
    const end = dayjs.utc(meeting.end * 1000).format("h:mm a");

    return `${start}–${end}`;
}

export function scheduleMeetingToString(meeting: ScheduleMeeting): string {
    return `${meetingToString(meeting.meeting)} | ${meeting.name}`;
}

export type ScheduleMeeting = {
    name: string;
    meeting: MeetingTime;
};
