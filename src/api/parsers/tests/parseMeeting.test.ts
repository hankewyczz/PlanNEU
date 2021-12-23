import { parseBackendMeeting, parseBackendMeetings } from "../parseSection";
import meetings from "./data/backendMeetings.data";
import { BinaryMeetingTime } from "../../../types/meetingTimes";

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

  test("Snapshot", () => {
    expect(parseBackendMeetings(meetings.cs3000_4)).toMatchObject(
      meetings.cs3000_4_parsed
    );
  });
});
