import { MeetingDay } from "../../types/types";
import { TimestampMeetings } from "../timestampMeetings";
import sections from "./data/sections.data";
import {
    fromUnixTime,
    getSeconds,
    getMinutes,
    getHours,
    isSunday,
    isMonday,
    isTuesday,
    isWednesday,
    isThursday,
    isFriday,
    isSaturday,
} from "date-fns";
import { nestedArrayEquality } from "../../utils/global";

describe("secondsToTimestamp", () => {
    test("Days are correct", () => {
        const sunday = TimestampMeetings.secondsToTimestamp(MeetingDay.SUNDAY, 0);
        const sunday_date = fromUnixTime(sunday);

        expect(isSunday(sunday_date)).toBeTruthy();
        expect(getSeconds(sunday_date)).toBe(0);

        const monday = TimestampMeetings.secondsToTimestamp(MeetingDay.MONDAY, 48900);
        const monday_date = fromUnixTime(monday);

        expect(isMonday(monday_date)).toBeTruthy();
        expect(getSeconds(monday_date)).toBe(0);
        expect(getMinutes(monday_date)).toBe(35);
        expect(getHours(monday_date)).toBe(13);

        const tuesday = TimestampMeetings.secondsToTimestamp(MeetingDay.TUESDAY, 54900);
        const tuesday_date = fromUnixTime(tuesday);

        expect(isTuesday(tuesday_date)).toBeTruthy();
        expect(getSeconds(tuesday_date)).toBe(0);
        expect(getMinutes(tuesday_date)).toBe(15);
        expect(getHours(tuesday_date)).toBe(15);

        const wednesday = TimestampMeetings.secondsToTimestamp(MeetingDay.WEDNESDAY, 54900);
        const wednesday_date = fromUnixTime(wednesday);

        expect(isWednesday(wednesday_date)).toBeTruthy();
        expect(getSeconds(wednesday_date)).toBe(0);
        expect(getMinutes(wednesday_date)).toBe(15);
        expect(getHours(wednesday_date)).toBe(15);

        const thursday = fromUnixTime(
            TimestampMeetings.secondsToTimestamp(MeetingDay.THURSDAY, 54900)
        );
        expect(isThursday(thursday)).toBeTruthy();

        const friday = fromUnixTime(TimestampMeetings.secondsToTimestamp(MeetingDay.FRIDAY, 54900));
        expect(isFriday(friday)).toBeTruthy();

        const saturday = fromUnixTime(
            TimestampMeetings.secondsToTimestamp(MeetingDay.SATURDAY, 54900)
        );
        expect(isSaturday(saturday)).toBeTruthy();
    });

    test("timestampMeetings construction", () => {
        const meetings = new TimestampMeetings(sections.cs3000_202210_1().meetings);

        const ts_meetings = [];
        ts_meetings.push({
            start: TimestampMeetings.secondsToTimestamp(MeetingDay.TUESDAY, 48900),
            end: TimestampMeetings.secondsToTimestamp(MeetingDay.TUESDAY, 54900),
        });
        ts_meetings.push({
            start: TimestampMeetings.secondsToTimestamp(MeetingDay.FRIDAY, 48900),
            end: TimestampMeetings.secondsToTimestamp(MeetingDay.FRIDAY, 54900),
        });

        expect(ts_meetings.sort()).toEqual(meetings.meetings.sort());
    });
});
