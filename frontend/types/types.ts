export interface Results {
    courses: Course[];
    sections: Record<string, Section>;
    results: string[];
    stats: ResultStats;
}

export interface ResultStats {
    numCombinations: number;
    time: number;
}

export interface Course {
    termId: string;
    subject: string;
    classId: string;
    name: string;
    coreqs: Requisite;
    sections: Section[];
}

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
export type MeetingTimes = Partial<Record<MeetingDay, MeetingTime[]>>;

// A single meeting time, ex: "9:50-11:30am"
export interface MeetingTime {
    start: number;
    end: number;
}
