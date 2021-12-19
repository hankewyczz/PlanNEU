import { INTERVALS_IN_DAY } from "../utils/global";
import { BinaryMeetingTime } from "./meetingTimes";

export interface Course {
  termId: string;
  subject: string;
  classId: string;
  name: string;
  coreqs: Requisite;
  sections: Section[];
}

// The same as a course, but with parsed sections
export type ParsedCourse = Omit<Course, 'sections'> & Record<"sections", ParsedSection[]>;

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

// The same as a section, but with parsed meetings
export type ParsedSection = Omit<Section, 'meetings'> & Record<"meetings", BinaryMeetingTime>;


// Used for generating combinations
export interface MinimalSection {
  crn: string;
  meetings: BinaryMeetingTime;
}

export class PartialResult {
  crns: string[];
  meetings: BinaryMeetingTime;

  constructor(crns: string[], meetings: BinaryMeetingTime) {
    this.crns = crns;
    this.meetings = meetings;
  }
}

export type Result = string[];

export interface BackendMeeting {
  startDate: number; // Number of days since epoch
  endDate: number;
  where: string;
  type: string;
  times: MeetingTimes;
}

// TODO - are there ever any Saturday/Sunday classes
// We compare the meeting times n! times, so any reduction in problem space translates to very real optimiations
export type MeetingDay = "0" | "1" | "2" | "3" | "4" | "5" | "6";
export type MeetingTimes = Partial<Record<MeetingDay, MeetingTime[]>>;

// A single meeting time, ex: "9:50-11:30am"
export interface MeetingTime {
  start: number;
  end: number;
}