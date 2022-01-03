import { INTERVALS_IN_DAY } from "../../utils/global";
import { MeetingDay, toMeetingDay } from "../../types/types";

/**
 * Represents a week's worth of meetings, with time broken into 5-minute chunks
 * 
 * This is an efficient (important since we use it so often) way of checking for time overlaps. 
 * 
 * We take a week's worth of meetings, and represent it as a binary string.
 * Each character represents 5 minutes. A '1' indicates a meeting, and '0' indicates no meeting.
 * The string represents all 7 days, starting with Sunday.
 * 
 * Unfortunately, Javascript bitwise operations are limited to 32 bit numbers,
 * so we can't use actual bitwise operations (which would be much faster)
 */
export class BinaryMeetingTime {
    readonly times: string;

    // A BinaryMeetingTime which will never conflict with anything
    static EMPTY = new BinaryMeetingTime(new Array(INTERVALS_IN_DAY * 7).fill(0).join(""));

    constructor(string: string) {
        // A little sanity check to make sure the times string is of the correct length
        const expected_length = INTERVALS_IN_DAY * 7;
        if (string.length !== expected_length) {
            throw Error(`Malformed - should be length ${expected_length}, but is ${string.length}`);
        }
        this.times = string;
    }

    /**
     * Creates a BinaryMeetingTime instance from a Set of MeetingDays, blocking each given day off completely
     * @param days The days which should be blocked off
     * @returns A BinaryMeetingTime, with the given days blocked off
     */
    static fromMeetingDays(days: Set<MeetingDay>) {
        const day_str = [];

        // Iterate over all the days
        for (let day = 0; day < 7; day++) {
            const value = days.has(toMeetingDay(day)) ? '1' : '0';
            day_str.push(new Array(INTERVALS_IN_DAY).fill(value).join(""))
        }

        return new BinaryMeetingTime(day_str.join(""));
    }


    /**
     * Converts this BinaryMeetingTime to a set of MeetingDays, representing the days which have any meetings
     * @returns A set of MeetingDays on which any event occurs
     */
    days(): Set<MeetingDay> {
        const days: Set<MeetingDay> = new Set();
        for (let day = 0; day < 7; day++) {
            const day_str = this.times.slice(day * INTERVALS_IN_DAY, (day + 1) * INTERVALS_IN_DAY);

            if (day_str.includes("1")) {
                days.add(toMeetingDay(day));
            }
        }

        return days;
    }


    /**
     * Compares the times of this BinaryMeetingTime with another.
     * @param one A BinaryMeetingTime
     * @param two A BinaryMeetingTime
     * @returns If there is any overlap, False is returned.
     * Otherwise, a new BinaryMeetingTime instance is returned
     */
    static combine(one: BinaryMeetingTime, two: BinaryMeetingTime): BinaryMeetingTime | false {
        const combinedStr: string[] = [];

        for (let i = 0; i < one.times.length; i++) {
            if (one.times[i] === "1" && two.times[i] === "1") {
                return false;
            }

            if (one.times[i] !== two.times[i]) {
                combinedStr.push("1");
            } else {
                combinedStr.push("0");
            }
        }

        // If we got this far, there's no overlap, so we return the new instance
        return new BinaryMeetingTime(combinedStr.join(""));
    }

    /**
     * Combines many BinaryMeetingTimes, or returns a number if there is overlap
     * @param meetings The meetings which we attempt to combine
     * @returns The combined meeting, or a number indicating the first index at which there was a conflict
     */
    static combineMany(meetings: BinaryMeetingTime[]): BinaryMeetingTime | number {
        let combined = BinaryMeetingTime.EMPTY;
        let count = 0;

        for (const meeting of meetings) {
            const cur = BinaryMeetingTime.combine(combined, meeting);

            if (cur === false) {
                return count;
            }

            combined = cur;
            count++;
        };

        return combined;
    }
}
