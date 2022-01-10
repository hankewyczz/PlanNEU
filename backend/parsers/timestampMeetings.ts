import { set, getUnixTime } from "date-fns";
import { BackendMeeting, MeetingDay, TimestampMeeting } from "../types/types";
import { zonedTimeToUtc } from "date-fns-tz";

/**
 * Converts meetings to UNIX timestamp format
 * @param meetings A BackendMeeting list, representing a section's meetings
 * @returns A list of objects, each having a start and end, and each in UNIX timestamp format
 */
export function parseMeetingsToTimestamps(
    meetings: BackendMeeting[],
    campus = "BOSTON"
): TimestampMeeting[] {
    const timestamp_meetings = [];

    for (const meeting of meetings) {
        // We don't care about exam times
        if (meeting.type.toLowerCase().includes("exam")) {
            continue;
        }
        for (const [day, times] of Object.entries(meeting.times)) {
            for (const time of times) {
                timestamp_meetings.push({
                    start: secondsToTimestamp(day as MeetingDay, time.start, campus),
                    end: secondsToTimestamp(day as MeetingDay, time.end, campus),
                });
            }
        }
    }

    return timestamp_meetings;
}
/**
 * Converts a MeetingDay and seconds into  UNIX timestamp, keeping the weekday consistent
 * @param day The weekday of this event
 * @param seconds The time (not duraction) of this event time, in seconds, from the start of the day
 * @returns A UNIX timestamp, with the same time and weekday
 */
export function secondsToTimestamp(day: MeetingDay, seconds: number, campus: string): number {
    // We don't care about the meeting DATE, we only care about the WEEKDAY
    // So, we just use the week of 1970-01-04, which is a Sunday
    const meeting_date = Number.parseInt(day) + 4;

    const base_date = set(new Date(1970, 0, meeting_date), { seconds: seconds });
    const time_zone = campusToTimezone(campus);
    const tz_date = zonedTimeToUtc(base_date, time_zone);
    return getUnixTime(tz_date);
}

/**
 * Returns the timezone matching a known Northeastern campus
 * @param campus A known Northeastern campus
 * @returns The timezone which corresponds to this campus
 */
export function campusToTimezone(campus: string): string {
    const parsed_campus = campus.toUpperCase();

    switch (parsed_campus) {
        case "BOSTON":
        case "ONLINE":
        case "PORTLAND, MAINE":
        case "MUSEUM OF FINE ARTS":
        case "MUSEUM SCHOOL OF FINE ARTS":
        case "CHARLOTTE, NC":
        case "BURLINGTON":
        case "NAHANT":
            return "US/Eastern";

        case "TORONTO, CANADA":
            return "America/Toronto";

        case "VANCOUVER, CANADA":
            return "America/Vancouver";

        case "SEATTLE, WA":
        case "SILICON VALLEY, CA":
        case "SAN FRANCISCO, CA":
        case "FRIDAY HARBOR, WASHINGTON":
            return "US/Pacific";

        case "HAWAII":
            return "US/Hawaii";

        case "LONDON":
            return "Europe/London";

        case "UTC":
            return "UTC";

        default:
            console.error(
                `Uh oh! Aoun must've bought a new campus - add it to the list: ${parsed_campus}`
            );
            return "UTC";
    }
}
