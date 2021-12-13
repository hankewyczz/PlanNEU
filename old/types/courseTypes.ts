export function isBooleanReq(req: Requisite): req is BooleanReq {
  return (req as BooleanReq).type !== undefined;
}

export function isCourseReq(req: Requisite): req is CourseReq {
  return (req as CourseReq).classId !== undefined;
}

// A section of a course
export interface Section {
  host: string;
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
  startDate: number;
  endDate: number;
  where: string;
  type: string;
  times: Partial<
    Record<"0" | "1" | "2" | "3" | "4" | "5" | "6", MeetingTime[]>
  >;
}

// A single meeting time, ex: "9:50-11:30am"
export interface MeetingTime {
  start: number | string;
  end: number | string;
}

export interface Course {
  host: string;
  termId: string;
  subject: string;
  classId: string;
  classAttributes: string[];
  desc: string;
  prettyUrl: string;
  name: string;
  url: string;
  lastUpdateTime: number;
  maxCredits: number;
  minCredits: number;
  coreqs: Requisite;
  prereqs: Requisite;
  feeAmount: number;
  feeDescription: string;
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
