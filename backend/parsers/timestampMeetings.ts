import { set, getUnixTime } from "date-fns";
import { BackendMeeting, MeetingDay } from "../types/types";

export type TimestampMeeting = {
    start: number;
    end: number;
};

export class TimestampMeetings {
    meetings: TimestampMeeting[] = [];

    constructor(meetings: BackendMeeting[]) {
        for (const meeting of meetings) {
            // We don't care about exam times
            if (meeting.type.toLowerCase().includes("exam")) {
                continue;
            }
            for (const [day, times] of Object.entries(meeting.times)) {
                for (const time of times) {
                    this.meetings.push({
                        start: TimestampMeetings.secondsToTimestamp(day as MeetingDay, time.start),
                        end: TimestampMeetings.secondsToTimestamp(day as MeetingDay, time.end),
                    });
                }
            }
        }
    }

    /**
     * Converts a MeetingDay and seconds into  UNIX timestamp, keeping the weekday consistent
     * @param day The weekday of this event
     * @param seconds The time (not duraction) of this event time, in seconds, from the start of the day
     * @returns A UNIX timestamp, with the same time and weekday
     */
    static secondsToTimestamp(day: MeetingDay, seconds: number): number {
        // We don't care about the meeting DATE, we only care about the WEEKDAY
        // So, we just use the week of 1970-01-04, which is a Sunday
        const meeting_date = Number.parseInt(day) + 4;
        return getUnixTime(set(new Date(1970, 0, meeting_date), { seconds: seconds }));
    }
}
