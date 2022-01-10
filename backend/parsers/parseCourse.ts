import { Section, BackendMeeting, Course, ParsedCourse, ParsedSection, toMeetingDay } from "../types/types";
import { INTERVALS_IN_DAY, INTERVAL_LENGTH } from "../utils/global";
import { BinaryMeetingTime } from "./binaryMeetings";

/**
 * Parses a list of courses in place (mutating them)
 * @param courses The list of courses to parse
 * @returns A list of parsed courses
 */
export function parseCourses(courses: Course[]): ParsedCourse[] {
    return courses.map((c) => parseCourse(c));
}

/**
 * Parses a Course to a ParsedCourse IN PLACE (ie. mutates the passed course)
 * @param course the course to parse
 * @returns The parsed course
 */
export function parseCourse(course: Course): ParsedCourse {
    return { ...course, sections: course.sections.map((s) => parseSection(s)) };
}

/**
 * Parses a single section
 * @param section A section
 * @returns The parsed section object
 */
 export function parseSection(section: Section): ParsedSection {
  // We do this since the conversion makes Typescript complain
  // So, the outer function preserves the Section requirement, and the inner does all the work.
  function __parseSection(section: any): ParsedSection {
      section.meetings = parseBackendMeetings(section.meetings);
      return section;
  }

  return __parseSection(section);
}

/**
* Parses a list of BackendMeetings into a single BinaryMeetingTime
* @param meetings The list of meetings to parse and combine
* @returns A combined BinaryMeetingTime, representing all the given meetings
*/
export function parseBackendMeetings(meetings: BackendMeeting[]): BinaryMeetingTime {
  const parsed_meetings = meetings
      // We don't care about exam times
      .filter((meeting) => !meeting.type.toLowerCase().includes("exam"))
      .map((meeting) => parseBackendMeeting(meeting));

  const combined_meeting = BinaryMeetingTime.combineMany(parsed_meetings);

  if (!(combined_meeting instanceof BinaryMeetingTime)) {
      throw Error("Meetings of a single section should never overlap");
  }

  return combined_meeting;
}

/**
* Parses a BackendMeeting to a BinaryMeetingTime (for context, read the class comments of `BinaryMeetingTime`)
* @param meeting The BackendMeeting which we convert
* @returns A BinaryMeetingTime, corresponding to the meeting times in the given meeting.
*/
export function parseBackendMeeting(meeting: BackendMeeting): BinaryMeetingTime {
  const binary: string[] = [];

  for (let day = 0; day < 7; day++) {
      const meeting_day = toMeetingDay(day);
      const day_intervals = new Array(INTERVALS_IN_DAY).fill(0);

      // If there's no meetings on this day, all intervals are free
      const day_meetings = meeting.times[meeting_day];
      if (day_meetings === undefined) {
          binary.push(day_intervals.join(""));
          continue;
      }

      // Otherwise, we have something on this day
      for (const meeting_time of day_meetings) {
          for (let interval = 0; interval < INTERVALS_IN_DAY; interval++) {
              const interval_time = interval * INTERVAL_LENGTH;
              if (interval_time >= meeting_time.start && interval_time < meeting_time.end) {
                  day_intervals[interval] = 1;
              }
          }
      }

      binary.push(day_intervals.join(""));
  }

  return new BinaryMeetingTime(binary.join(""));
}