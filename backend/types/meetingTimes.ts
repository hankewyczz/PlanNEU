/*
BIG PICTURE OVERVIEW:
Problem: 
- We need to check for time overlaps quite often, so every little optimization goes a long way
- At the same time, making it simple helps developer understanding (no need to worry about "<" vs "<=" and overthinking it)

Solution: Binary masks
Each digit in the string represents 5 minutes. If '1', the meeting is in progress. If '0', no meeting.
We can very easily check for overlap by iterating over the digits and checking if both digits are '1'

This would be even faster via actual binary masks, but Javascript bitwise operations are limited to 32 bit numbers (not enough for our needs).
*/

import { Filter } from "../filters/filter";
import { INTERVALS_IN_DAY } from "../utils/global";
import { MeetingDay } from "./types";

// Represents all meeting times for a section
// The number starts on Sunday, and goes for the entire week.
export class BinaryMeetingTime {
  startDate: number; // Number of days since epoch
  endDate: number;
  days: Set<MeetingDay>;
  readonly times: string;

  // A BinaryMeetingTime which will never conflict with anything
  static EMPTY = new BinaryMeetingTime(
    0,
    0,
    new Array(INTERVALS_IN_DAY * 7).fill(0).join(""),
    new Set()
  );

  constructor(
    startDate: number,
    endDate: number,
    string: string,
    days: Set<MeetingDay>
  ) {
    this.startDate = startDate;
    this.endDate = endDate;

    if (string.length !== INTERVALS_IN_DAY * 7) {
      throw Error(`String is malformed - unexpected length ${string.length}`);
    }
    this.times = string;
    this.days = days;
  }

  /**
   * Compares the times of this BinaryMeetingTime with another.
   * If there is any overlap, False is returned.
   * Otherwise, a new BinaryMeetingTime instance is returned
   */
  static combine(
    one: BinaryMeetingTime,
    two: BinaryMeetingTime
  ): BinaryMeetingTime | false {
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
    // TODO - this makes the assumption that date ranges will overlap (not necessarily true for LAW and CPS classes).
    const startDate = Math.min(one.startDate, two.startDate);
    const endDate = Math.max(one.endDate, two.endDate);

    // construct the new set
    const union = new Set(one.days);
    two.days.forEach((elem) => union.add(elem));

    return new BinaryMeetingTime(
      startDate,
      endDate,
      combinedStr.join(""),
      union
    );
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
