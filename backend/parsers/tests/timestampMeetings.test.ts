import { MeetingDay } from "../../types/types";
import { parseMeetingsToTimestamps, secondsToTimestamp } from "../timestampMeetings";
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

describe("secondsToTimestamp", () => {
    test("Days are correct", () => {
        // NOTE - these tests are dependant on the timezone of the computer running this
        // (thanks to JS Date objects)
        const sunday = secondsToTimestamp(MeetingDay.SUNDAY, 0, "BOSTON");
        const sunday_date = fromUnixTime(sunday);

        expect(isSunday(sunday_date)).toBeTruthy();
        expect(getSeconds(sunday_date)).toBe(0);

        const monday = secondsToTimestamp(MeetingDay.MONDAY, 48900, "BOSTON");
        const monday_date = fromUnixTime(monday);

        expect(isMonday(monday_date)).toBeTruthy();
        expect(getSeconds(monday_date)).toBe(0);
        expect(getMinutes(monday_date)).toBe(35);

        const tuesday = secondsToTimestamp(MeetingDay.TUESDAY, 54900, "BOSTON");
        const tuesday_date = fromUnixTime(tuesday);

        expect(isTuesday(tuesday_date)).toBeTruthy();
        expect(getSeconds(tuesday_date)).toBe(0);
        expect(getMinutes(tuesday_date)).toBe(15);

        const wednesday = secondsToTimestamp(MeetingDay.WEDNESDAY, 54900, "BOSTON");
        const wednesday_date = fromUnixTime(wednesday);

        expect(isWednesday(wednesday_date)).toBeTruthy();
        expect(getSeconds(wednesday_date)).toBe(0);
        expect(getMinutes(wednesday_date)).toBe(15);

        const thursday = fromUnixTime(secondsToTimestamp(MeetingDay.THURSDAY, 54900, "BOSTON"));
        expect(isThursday(thursday)).toBeTruthy();

        const friday = fromUnixTime(secondsToTimestamp(MeetingDay.FRIDAY, 54900, "BOSTON"));
        expect(isFriday(friday)).toBeTruthy();

        const saturday = fromUnixTime(secondsToTimestamp(MeetingDay.SATURDAY, 54900, "BOSTON"));
        expect(isSaturday(saturday)).toBeTruthy();
    });

    test("timestampMeetings construction", () => {
        const meetings = parseMeetingsToTimestamps(sections.cs3000_202210_1().meetings);

        const ts_meetings = [];
        ts_meetings.push({
            start: secondsToTimestamp(MeetingDay.TUESDAY, 48900, "Boston"),
            end: secondsToTimestamp(MeetingDay.TUESDAY, 54900, "Boston"),
            endDate: 1638921600,
            startDate: 1631059200,
            type: "Class",
            where: "Cargill Hall 097",
        });
        ts_meetings.push({
            start: secondsToTimestamp(MeetingDay.FRIDAY, 48900, "Boston"),
            end: secondsToTimestamp(MeetingDay.FRIDAY, 54900, "Boston"),
            endDate: 1638921600,
            startDate: 1631059200,
            type: "Class",
            where: "Cargill Hall 097",
        });

        expect(meetings.sort()).toEqual(ts_meetings.sort());
    });
});
