import { isCourseHash, isSectionHash, MeetingDay, toMeetingDay } from "../types"

describe("Type guards", () => {
    test("isCourseHash", () => {
        expect(isCourseHash("asdbskjdsdf")).toBeFalsy();
        expect(isCourseHash("cs2500")).toBeFalsy();
        expect(isCourseHash("CS2500")).toBeFalsy();
        expect(isCourseHash("CS/2500/123456")).toBeFalsy();
        expect(isCourseHash("cs/2500123456")).toBeFalsy();
        
        expect(isCourseHash("CS/2500")).toBeTruthy();
        expect(isCourseHash("ENGQ/2500")).toBeTruthy();
        expect(isCourseHash("subject/2500")).toBeTruthy();
        expect(isCourseHash("CS/1234")).toBeTruthy();
    })

    test("isSectionHash", () => {
        expect(isSectionHash("asdbskjdsdf")).toBeFalsy();
        expect(isSectionHash("cs2500")).toBeFalsy();
        expect(isSectionHash("CS2500")).toBeFalsy();
        expect(isSectionHash("cs/2500123456")).toBeFalsy();
        expect(isSectionHash("CS/2500")).toBeFalsy();
        expect(isSectionHash("CS/abc/123")).toBeFalsy();
        expect(isSectionHash("CS/2800/abc123")).toBeFalsy();
        expect(isSectionHash("ENGQ/2500")).toBeFalsy();
        expect(isSectionHash("subject/2500")).toBeFalsy();
        expect(isSectionHash("CS/1234")).toBeFalsy();

        expect(isSectionHash("CS/1234/1234567")).toBeTruthy();
        expect(isSectionHash("CS/1234/12345")).toBeTruthy();
    })

    test("Test toMeetingDay", () => {
        expect(toMeetingDay(0)).toBe(MeetingDay.SUNDAY)
        expect(toMeetingDay(1)).toBe(MeetingDay.MONDAY)
        expect(toMeetingDay(2)).toBe(MeetingDay.TUESDAY)
        expect(toMeetingDay(3)).toBe(MeetingDay.WEDNESDAY)
        expect(toMeetingDay(4)).toBe(MeetingDay.THURSDAY)
        expect(toMeetingDay(5)).toBe(MeetingDay.FRIDAY)
        expect(toMeetingDay(6)).toBe(MeetingDay.SATURDAY)

        expect(() => toMeetingDay(7)).toThrow()
        expect(() => toMeetingDay(Number.POSITIVE_INFINITY)).toThrow()
        expect(() => toMeetingDay(Number.NEGATIVE_INFINITY)).toThrow()
        expect(() => toMeetingDay(Number.MAX_SAFE_INTEGER)).toThrow()
        expect(() => toMeetingDay(-1)).toThrow()
        expect(() => toMeetingDay(Number.NaN)).toThrow()
        
        expect(toMeetingDay('0')).toBe(MeetingDay.SUNDAY)
        expect(toMeetingDay('1')).toBe(MeetingDay.MONDAY)
        expect(toMeetingDay('2')).toBe(MeetingDay.TUESDAY)
        expect(toMeetingDay('3')).toBe(MeetingDay.WEDNESDAY)
        expect(toMeetingDay('4')).toBe(MeetingDay.THURSDAY)
        expect(toMeetingDay('5')).toBe(MeetingDay.FRIDAY)
        expect(toMeetingDay('6')).toBe(MeetingDay.SATURDAY)

        expect(() => toMeetingDay('')).toThrow()
        expect(() => toMeetingDay(7)).toThrow()


        
        
    })

    
})