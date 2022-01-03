import { parseBackendMeeting, parseBackendMeetings } from "../parseSection";
import meetings from "./data/meetingTimes.data";
import { BinaryMeetingTime } from "../meetingTimes";
import { MeetingDay } from "../../../types/types";

describe("parsing meeting times & checking overlap", () => {
    test("no breaks", () => {
        const full = parseBackendMeeting(meetings.fullWeek);
        const empty = parseBackendMeeting(meetings.empty);

        expect(BinaryMeetingTime.combine(full, full)).toBeFalsy();
        expect(BinaryMeetingTime.combine(full, empty)).toBeTruthy();
        expect(BinaryMeetingTime.combine(empty, empty)).toBeTruthy();
    });

    let cs3000_1: BinaryMeetingTime;
    let cs3000_2: BinaryMeetingTime;
    let cs3000_3: BinaryMeetingTime;
    let cs3800_1: BinaryMeetingTime;
    let cs3800_2: BinaryMeetingTime;
    let cs4850: BinaryMeetingTime;

    beforeAll(() => {
        cs3000_1 = parseBackendMeeting(meetings.cs3000_1);
        cs3000_2 = parseBackendMeeting(meetings.cs3000_2);
        cs3000_3 = parseBackendMeeting(meetings.cs3000_3);
        cs3800_1 = parseBackendMeeting(meetings.cs3800_1);
        cs3800_2 = parseBackendMeeting(meetings.cs3800_2);
        cs4850 = parseBackendMeetings(meetings.cs4850);
    });

    test("Identity", () => {
        expect(BinaryMeetingTime.combine(cs3000_1, cs3000_1)).toBeFalsy();
        expect(BinaryMeetingTime.combine(cs3000_2, cs3000_2)).toBeFalsy();
        expect(BinaryMeetingTime.combine(cs3000_3, cs3000_3)).toBeFalsy();
        expect(BinaryMeetingTime.combine(cs3800_1, cs3800_1)).toBeFalsy();
        expect(BinaryMeetingTime.combine(cs3800_2, cs3800_2)).toBeFalsy();
        expect(BinaryMeetingTime.combine(cs4850, cs4850)).toBeFalsy();
    });

    test("Identical overlap", () => {
        expect(BinaryMeetingTime.combine(cs3000_1, cs3800_1)).toBeFalsy();
        expect(BinaryMeetingTime.combine(cs3800_1, cs3000_1)).toBeFalsy();

        expect(BinaryMeetingTime.combine(cs3000_2, cs3800_2)).toBeFalsy();
        expect(BinaryMeetingTime.combine(cs3800_2, cs3000_2)).toBeFalsy();
    });

    test("No overlap", () => {
        expect(BinaryMeetingTime.combine(cs3000_1, cs3800_2)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3000_1, cs3000_2)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3000_1, cs3000_3)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3000_1, cs4850)).toBeTruthy();

        expect(BinaryMeetingTime.combine(cs3000_2, cs3800_1)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3000_2, cs3000_1)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3000_2, cs3000_3)).toBeTruthy();

        expect(BinaryMeetingTime.combine(cs3000_3, cs3800_1)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3000_3, cs3800_2)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3000_3, cs3000_1)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3000_3, cs3000_2)).toBeTruthy();

        expect(BinaryMeetingTime.combine(cs3800_1, cs3000_2)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3800_1, cs3000_3)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3800_1, cs3800_2)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3800_1, cs4850)).toBeTruthy();

        expect(BinaryMeetingTime.combine(cs3800_2, cs3000_1)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3800_2, cs3000_3)).toBeTruthy();
        expect(BinaryMeetingTime.combine(cs3800_2, cs3800_1)).toBeTruthy();
    });

    test("Partial overlap", () => {
        expect(BinaryMeetingTime.combine(cs3800_2, cs4850)).toBeFalsy();
        expect(BinaryMeetingTime.combine(cs3000_2, cs4850)).toBeFalsy();
        expect(BinaryMeetingTime.combine(cs3000_3, cs4850)).toBeFalsy();
    });

    test("Error handling", () => {
        expect(() => {
            parseBackendMeetings(meetings.overlap_single_section);
        }).toThrow();
        expect(() => {
            parseBackendMeetings(meetings.no_meetings);
        }).toThrow();
    });

    test("Times string must be of consistent length", () => {
        expect(() => {
            new BinaryMeetingTime(
                "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011111111111111111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011111111111111111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
            );
        }).toThrow();
    });

    test("Snapshot", () => {
        expect(parseBackendMeetings(meetings.cs3000_4)).toMatchObject(meetings.cs3000_4_parsed);
    });
});

describe("BinaryMeetingTime methods", () => {
    let cs3000_1: BinaryMeetingTime;
    let cs3000_2: BinaryMeetingTime;
    let cs3000_3: BinaryMeetingTime;
    let cs3800_1: BinaryMeetingTime;
    let cs3800_2: BinaryMeetingTime;
    let cs4850: BinaryMeetingTime;

    beforeAll(() => {
        cs3000_1 = parseBackendMeeting(meetings.cs3000_1);
        cs3000_2 = parseBackendMeeting(meetings.cs3000_2);
        cs3000_3 = parseBackendMeeting(meetings.cs3000_3);
        cs3800_1 = parseBackendMeeting(meetings.cs3800_1);
        cs3800_2 = parseBackendMeeting(meetings.cs3800_2);
        cs4850 = parseBackendMeetings(meetings.cs4850);
    });

    test("Constructing from days", () => {
        const meeting1 = BinaryMeetingTime.fromMeetingDays(
            new Set<MeetingDay>([
                MeetingDay.SUNDAY,
                MeetingDay.TUESDAY,
                MeetingDay.THURSDAY,
                MeetingDay.SATURDAY,
            ])
        );
        const meeting2 = BinaryMeetingTime.fromMeetingDays(
            new Set<MeetingDay>([MeetingDay.MONDAY, MeetingDay.WEDNESDAY, MeetingDay.FRIDAY])
        );

        expect(BinaryMeetingTime.combine(meeting1, meeting2)).toBeTruthy();

        const meeting3 = BinaryMeetingTime.fromMeetingDays(
            new Set<MeetingDay>([MeetingDay.FRIDAY])
        );
        const meeting4 = BinaryMeetingTime.fromMeetingDays(
            new Set<MeetingDay>([MeetingDay.WEDNESDAY, MeetingDay.FRIDAY])
        );
        expect(BinaryMeetingTime.combine(meeting4, meeting3)).toBeFalsy();
    });

    test("Getting days strings", () => {
        expect(meetings.cs3000_4_parsed.days()).toEqual(new Set<MeetingDay>([MeetingDay.TUESDAY, MeetingDay.FRIDAY]))

        const set1 = new Set<MeetingDay>([
            MeetingDay.SUNDAY,
            MeetingDay.TUESDAY,
            MeetingDay.THURSDAY,
            MeetingDay.SATURDAY,
        ])
        
        const set2 = new Set<MeetingDay>([MeetingDay.MONDAY, MeetingDay.WEDNESDAY, MeetingDay.FRIDAY])

        expect(BinaryMeetingTime.fromMeetingDays(set1).days()).toEqual(set1);
        expect(BinaryMeetingTime.fromMeetingDays(set2).days()).toEqual(set2);


    });

    test("combineMany", () => {
        expect(BinaryMeetingTime.combineMany([cs3000_1, cs3800_2])).toBeInstanceOf(BinaryMeetingTime);
        expect(BinaryMeetingTime.combineMany([cs3000_1, cs3000_2, cs3000_3])).toBeInstanceOf(BinaryMeetingTime);
        expect(BinaryMeetingTime.combineMany([cs3000_1, cs3000_1, cs3000_1, cs3000_1])).toBeGreaterThanOrEqual(0);
        expect(BinaryMeetingTime.combineMany([cs3000_1, cs3000_2, cs3000_3, cs3000_1])).toBeGreaterThanOrEqual(0);
        expect(BinaryMeetingTime.combineMany([cs3000_1, cs3000_2, cs3000_3, cs4850])).toBeGreaterThanOrEqual(0);
    })
});
