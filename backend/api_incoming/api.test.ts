import { stringToTime } from "./resolvers"


describe("string to time", () => {
    test("undefined", () => {
        expect(stringToTime(undefined)).toBeUndefined();
    })

    test("non-time values", () => {
        expect(stringToTime("12345123213")).toBeUndefined();
        expect(stringToTime("01:12:34")).toBeUndefined();
        expect(stringToTime("1:34")).toBeUndefined();
        expect(stringToTime("2::12")).toBeUndefined();
        expect(stringToTime("123:2")).toBeUndefined();
        expect(stringToTime("abcderf")).toBeUndefined();
        expect(stringToTime(":1:23")).toBeUndefined();
        expect(stringToTime(":123")).toBeUndefined();
        expect(stringToTime("")).toBeUndefined();
    })

    test("Times", () => {
        expect(stringToTime("00:00")).toBe(0);
        expect(stringToTime("00:01")).toBe(60);
        expect(stringToTime("00:60")).toBe(3600);
        expect(stringToTime("-1:61")).toBe(60);
        expect(stringToTime("13:35")).toBe(48900);
        expect(stringToTime("15:15")).toBe(54900);
    })
})