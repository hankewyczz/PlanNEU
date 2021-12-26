import { BinaryMeetingTime } from "./meetingTimes";

export type CourseHash = {
  subject: string;
  classId: string;
};
export type SectionHash = {
  subject: string;
  classId: string;
  crn: string;
}


function validSubjectAndId(subject: string, classId: string): boolean {
  return (/^[a-zA-Z]*$/.test(subject) && /^[0-9]{4}$/.test(classId))
}

export function isCourseHash(str: string): false | CourseHash {
  const parts = str.split("/");
  
  if (parts.length !== 2) {
    return false
  }

  if (!validSubjectAndId(parts[0], parts[1])) {
    return false
  }

  return {
    subject: parts[0],
    classId: parts[1]
  }
}


export function isSectionHash(str: string): false | SectionHash {
  const parts = str.split("/");
  
  if (parts.length !== 3) {
    return false
  }

  if (!validSubjectAndId(parts[0], parts[1])) {
    return false
  }

  if (!/^[0-9]*$/.test(parts[2])) {
    return false;
  }

  return {
    subject: parts[0],
    classId: parts[1],
    crn: parts[2]
  }

}


export interface Course {
  termId: string;
  subject: string;
  classId: string;
  name: string;
  coreqs: Requisite;
  sections: Section[];
}

// The same as a course, but with parsed sections
export type ParsedCourse = Omit<Course, "sections"> &
  Record<"sections", ParsedSection[]>;

export function isParsedCourse(course: any): course is ParsedCourse {
  const props = ["termId", "subject", "classId", "name", "coreqs", "sections"];

  if (
    !props.every((prop) => Object.prototype.hasOwnProperty.call(course, prop))
  ) {
    return false;
  }

  if (!course.sections.every((sec: any) => isParsedSection(sec))) {
    return false;
  }

  return true;
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

// The same as a section, but with parsed meetings
export type ParsedSection = Omit<Section, "meetings"> &
  Record<"meetings", BinaryMeetingTime>;

export function isParsedSection(section: any): section is ParsedSection {
  const props = [
    "classType",
    "crn",
    "seatsCapacity",
    "seatsRemaining",
    "waitCapacity",
    "waitRemaining",
    "lastUpdateTime",
    "campus",
    "honors",
    "url",
    "profs",
    "meetings",
  ];

  if (
    !props.every((prop) => Object.prototype.hasOwnProperty.call(section, prop))
  ) {
    return false;
  }

  if (!(section.meetings instanceof BinaryMeetingTime)) {
    return false;
  }

  return true;
}

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

// A list of CRNs of the sections
export type CRNsResult = string[];

export interface ResultStats {
  numCombinations: number;
  time: number;
}

export interface Results {
  courses: Course[];
  sections: Record<string, Section>;
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
export type MeetingTimes = Partial<Record<MeetingDay, MeetingTime[]>>;

// A single meeting time, ex: "9:50-11:30am"
export interface MeetingTime {
  start: number;
  end: number;
}
