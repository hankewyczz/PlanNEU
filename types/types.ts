import { INTERVALS_IN_DAY } from "../utils/global";

export interface Course {
  termId: string;
  subject: string;
  classId: string;
  name: string;
  coreqs: Requisite;
  sections?: Section[];
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
export type ParsedSection = Omit<Section, 'meetings'> & Record<"meetings", BinaryMeetingTime>;


// Used for generating combinations
export interface MinimalSection {
  crn: string;
  meetings: BinaryMeetingTime;
}

export interface MinimalCourse {
  termId: string;
  subject: string;
  classId: string;
  name: string;
  sections: MinimalSection[];
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
export type MeetingDay = "0" | "1" | "2" | "3" | "4" | "5" | "6";
export type MeetingTimes = Record<Partial<MeetingDay>, MeetingTime[]>;

// A single meeting time, ex: "9:50-11:30am"
export interface MeetingTime {
  start: number;
  end: number;
}

// Represents all meeting times for a section
// "string" is a binary number (in string format). Each digit represents 5 minutes. 
// The number starts on Sunday, and goes for the entire week.
export class BinaryMeetingTime {
  startDate: number; // Number of days since epoch
  endDate: number;
  private times: string;

  constructor(startDate: number, endDate: number, string: string) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.times = string;
  }

  /**
   * Compares the times of this BinaryMeetingTime with another. 
   * If there is any overlap, False is returned.
   * Otherwise, a new BinaryMeetingTime instance is returned
   * @param other 
   */
  static combine(one: BinaryMeetingTime, two: BinaryMeetingTime): BinaryMeetingTime | false {
    const combinedStr: string[] = [];

    for (let i = 0; i < one.times.length; i++) {
      if (one.times[i] === '1' && two.times[i] === '1') {
        return false
      }
      
      if (one.times[i] !== two.times[i]) {
        combinedStr.push('1')
      }
      else {
        combinedStr.push('0')
      }
    }

    // If we got this far, there's no overlap, so we return the new instance
    // TODO - this makes the assumption that date ranges will overlap (not necessarily true for LAW and CPS classes).
    const startDate = Math.min(one.startDate, two.startDate);
    const endDate = Math.max(one.endDate, two.endDate);

    return new BinaryMeetingTime(startDate, endDate, combinedStr.join(""));
  }
}