/*
BIG PICTURE OVERVIEW:
Problem: 
- We need to check for time overlaps quite often, so every little optimization goes a long way
- At the same time, making it simple helps developer understanding (no need to worry about overthinking it)

Solution: Binary masks
Each digit in the string represents 5 minutes. If '1', the meeting is in progress. If '0', no meeting.
We can very easily check for overlap by iterating over the digits and checking if both digits are '1'

This would be even faster via actual binary masks, but Javascript bitwise operations are limited to 32 bit numbers (not enough for our needs).
*/

import { Filter } from "../filters/filter";
import { INTERVALS_IN_DAY } from "../utils/global";
import { MeetingDay, toMeetingDay } from "./types";

// Represents all meeting times for a section
// The number starts on Sunday, and goes for the entire week.
export class BinaryMeetingTime {
    readonly times: string;

    // A BinaryMeetingTime which will never conflict with anything
    static EMPTY = new BinaryMeetingTime(new Array(INTERVALS_IN_DAY * 7).fill(0).join(""));

    constructor(string: string) {
        if (string.length !== INTERVALS_IN_DAY * 7) {
            throw Error(`String is malformed - unexpected length ${string.length}`);
        }
        this.times = string;
    }

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
     * If there is any overlap, False is returned.
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

        meetings.forEach((meeting) => {
            const cur = BinaryMeetingTime.combine(combined, meeting);
        
            if (cur === false) {
                return count;
            }

            combined = cur;            
            count++;
        });

        return combined;
    }

    /** Compares this BinaryMeetingTime to a single time string. Returns false if they overlap
     * IE. we don't care about start and end dates
     */
    compatibleWithFilter(filter: Filter): boolean {
        for (let i = 0; i <= this.times.length; i++) {
            if (this.times[i] === "1" && filter.times[i] === "1") {
                return false;
            }
        }
        return true;
    }
}
