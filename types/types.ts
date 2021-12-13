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
  termId: string;
  subject: string;
  classId: string;
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
  times: Partial<
    Record<"0" | "1" | "2" | "3" | "4" | "5" | "6", MeetingTime[]>
  >;
}

// A single meeting time, ex: "9:50-11:30am"
export interface MeetingTime {
  start: number;
  end: number;
}
