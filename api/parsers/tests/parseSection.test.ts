import { minifySection, parseBackendMeeting, parseBackendMeetings, parseSection } from "../parseSection";
import meetingData from "./data/backendMeetings.data";
import sectionData from "./data/sections.data"
import { BinaryMeetingTime } from "../../../types/types";

describe("parsing meeting times & checking overlap", () => {
  test("no breaks", () => {
    const full = parseBackendMeeting(meetingData.fullWeek);
    const empty = parseBackendMeeting(meetingData.empty);

    expect(BinaryMeetingTime.combine(full, full)).toBeFalsy();
    expect(BinaryMeetingTime.combine(full, empty)).toBeTruthy();
    expect(BinaryMeetingTime.combine(empty, empty)).toBeTruthy();
  });

  let algo_1: BinaryMeetingTime;
  let algo_2: BinaryMeetingTime;
  let algo_3: BinaryMeetingTime;
  let theory_comp_1: BinaryMeetingTime;
  let theory_comp_2: BinaryMeetingTime;
  let cs4850: BinaryMeetingTime;

  beforeAll(() => {
    algo_1 = parseBackendMeeting(meetingData.cs3000_1);
    algo_2 = parseBackendMeeting(meetingData.cs3000_2);
    algo_3 = parseBackendMeeting(meetingData.cs3000_3);
    theory_comp_1 = parseBackendMeeting(meetingData.cs3800_1);
    theory_comp_2 = parseBackendMeeting(meetingData.cs3800_2);
    cs4850 = parseBackendMeetings(meetingData.cs4850);
  });

  test("Identity", () => {
    expect(BinaryMeetingTime.combine(algo_1, algo_1)).toBeFalsy();
    expect(BinaryMeetingTime.combine(algo_2, algo_2)).toBeFalsy();
    expect(BinaryMeetingTime.combine(algo_3, algo_3)).toBeFalsy();
    expect(BinaryMeetingTime.combine(theory_comp_1, theory_comp_1)).toBeFalsy();
    expect(BinaryMeetingTime.combine(theory_comp_2, theory_comp_2)).toBeFalsy();
    expect(BinaryMeetingTime.combine(cs4850, cs4850)).toBeFalsy();
  });

  test("Identical overlap", () => {
    expect(BinaryMeetingTime.combine(algo_1, theory_comp_1)).toBeFalsy();
    expect(BinaryMeetingTime.combine(theory_comp_1, algo_1)).toBeFalsy();

    expect(BinaryMeetingTime.combine(algo_2, theory_comp_2)).toBeFalsy();
    expect(BinaryMeetingTime.combine(theory_comp_2, algo_2)).toBeFalsy();
  });

  test("No overlap", () => {
    expect(BinaryMeetingTime.combine(algo_1, theory_comp_2)).toBeTruthy();
    expect(BinaryMeetingTime.combine(algo_1, algo_2)).toBeTruthy();
    expect(BinaryMeetingTime.combine(algo_1, algo_3)).toBeTruthy();
    expect(BinaryMeetingTime.combine(algo_1, cs4850)).toBeTruthy();

    expect(BinaryMeetingTime.combine(algo_2, theory_comp_1)).toBeTruthy();
    expect(BinaryMeetingTime.combine(algo_2, algo_1)).toBeTruthy();
    expect(BinaryMeetingTime.combine(algo_2, algo_3)).toBeTruthy();

    expect(BinaryMeetingTime.combine(algo_3, theory_comp_1)).toBeTruthy();
    expect(BinaryMeetingTime.combine(algo_3, theory_comp_2)).toBeTruthy();
    expect(BinaryMeetingTime.combine(algo_3, algo_1)).toBeTruthy();
    expect(BinaryMeetingTime.combine(algo_3, algo_2)).toBeTruthy();

    expect(BinaryMeetingTime.combine(theory_comp_1, algo_2)).toBeTruthy();
    expect(BinaryMeetingTime.combine(theory_comp_1, algo_3)).toBeTruthy();
    expect(
      BinaryMeetingTime.combine(theory_comp_1, theory_comp_2)
    ).toBeTruthy();
    expect(BinaryMeetingTime.combine(theory_comp_1, cs4850)).toBeTruthy();

    expect(BinaryMeetingTime.combine(theory_comp_2, algo_1)).toBeTruthy();
    expect(BinaryMeetingTime.combine(theory_comp_2, algo_3)).toBeTruthy();
    expect(
      BinaryMeetingTime.combine(theory_comp_2, theory_comp_1)
    ).toBeTruthy();
  });

  test("Partial overlap", () => {
    expect(BinaryMeetingTime.combine(theory_comp_2, cs4850)).toBeFalsy();
    expect(BinaryMeetingTime.combine(algo_2, cs4850)).toBeFalsy();
    expect(BinaryMeetingTime.combine(algo_3, cs4850)).toBeFalsy();
  });

  test("Error handling", () => {
    expect(() => {
      parseBackendMeetings(meetingData.overlap_single_section);
    }).toThrow();
    expect(() => {
      parseBackendMeetings(meetingData.no_meetings);
    }).toThrow();
  });

  test("Snapshot", () => {
    expect(parseBackendMeetings(meetingData.cs3000_4)).toMatchObject(meetingData.cs3000_4_parsed)
  })
});


describe("Parse sections", () => {
  test("Sections parse properly", () => {
    const copy_1 = {...sectionData.algo1()};
    const copy_2 = {...sectionData.algo2()};
    const copy_3 = {...sectionData.algo3()};

    expect(parseSection(copy_1)).toMatchObject(sectionData.algo1_parsed())
    expect(parseSection(copy_2)).toMatchObject(sectionData.algo2_parsed())
    expect(parseSection(copy_3)).toMatchObject(sectionData.algo3_parsed())
  })

  test("Minimal sections", () => {
    expect(minifySection(sectionData.algo1_parsed())).toMatchObject(sectionData.algo1_minimal())
    expect(minifySection(sectionData.algo2_parsed())).toMatchObject(sectionData.algo2_minimal())
    expect(minifySection(sectionData.algo3_parsed())).toMatchObject(sectionData.algo3_minimal())
  })
})