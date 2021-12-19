import { BinaryMeetingTime } from "../../types/meetingTimes";
import {
  BackendMeeting,
  MeetingDay,
  MeetingTime,
  MinimalSection,
  ParsedSection,
  Section,
} from "../../types/types";
import { INTERVALS_IN_DAY, INTERVAL_LENGTH } from "../../utils/global";

export function parseSection(section: Section): ParsedSection {
  // We do this since the conversion makes Typescript complain
  // So, the outer function preserves the Section requirement, and the inner does all the work.
  function __parseSection(section: any): ParsedSection {
    section.meetings = parseBackendMeetings(section.meetings) as BinaryMeetingTime;
    return section;
  }

  return __parseSection(section);
}

export function parseBackendMeetings(
  meetings: BackendMeeting[]
): BinaryMeetingTime {
  let allMeetings: null | BinaryMeetingTime = null;

  for (const meeting of meetings) {
    // We don't care about exam times :( 
    if (meeting.type.toLowerCase().includes("exam")) {
      continue;
    }
    const oneMeeting = parseBackendMeeting(meeting);

    if (allMeetings === null) {
      allMeetings = oneMeeting;
      continue;
    }

    const combined = BinaryMeetingTime.combine(allMeetings, oneMeeting);

    if (!combined) {
      throw Error("Meetings of a single section should never overlap");
    }
    allMeetings = combined;
  }

  // This section has no meetings at all
  if (allMeetings === null) {
    throw Error("A section cannot have no meetings?");
  }

  return allMeetings;
}
/*
We want to REALLY optimize the process for checking for interval overlaps
The general idea is:
- Each meeting time occurs on a 5-minute boundury
- We can simplify meeting times to a binary string. 
    - Each digit represents a 5-minute block
    - If the meeting is occuring, the digit is 1. Else, 0
*/
export function parseBackendMeeting(
  meeting: BackendMeeting
): BinaryMeetingTime {
  const binaryRepresentation: string[] = [];

  for (let dayNum = 0; dayNum < 7; dayNum++) {
    const dayStr = dayNum.toString() as MeetingDay;
    const dayIntervals = new Array(INTERVALS_IN_DAY).fill(0);

    // If there's no meetings on this day, all intervals are free
    const dayMeetings = meeting.times[dayStr];
    if (dayMeetings === undefined) {
      binaryRepresentation.push(dayIntervals.join(""));
      continue;
    }

    for (const meetingTime of dayMeetings) {
      for (let interval = 0; interval <= INTERVALS_IN_DAY; interval++) {
        const intervalTime = interval * INTERVAL_LENGTH;
        if (
          intervalTime >= meetingTime.start &&
          intervalTime <= meetingTime.end
        ) {
          dayIntervals[interval] = 1;
        }
      }
    }

    binaryRepresentation.push(dayIntervals.join(""));
  }

  return new BinaryMeetingTime(
    meeting.startDate,
    meeting.endDate,
    binaryRepresentation.join("")
  );
}

export function minifySection(section: ParsedSection): MinimalSection {
  return {
    crn: section.crn,
    meetings: section.meetings,
  };
}
