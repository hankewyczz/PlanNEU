import { isCourseHash, isSectionHash } from "../types"

describe("Check hash type guards", () => {
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

    
})