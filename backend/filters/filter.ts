import { MeetingDay, ParsedSection } from "../types/types";
import {
    INTERVALS_IN_DAY,
    INTERVAL_LENGTH,
    SECONDS_IN_DAY,
} from "../utils/global";

// We use a builder pattern, since most of these arguments are optional
export class FilterBuilder {
    // Assign the default values so that NOTHING is filtered
    _start_time = 0;
    _end_time = SECONDS_IN_DAY;
    _days_free: MeetingDay[] = [];
    _min_num_days_free = 0;
    _min_seats_left = 0;
    _min_honors_courses = 0;

    constructor() {
        return this;
    }

    setStartTime(start: number | null): FilterBuilder {
        if (start !== null && start >= 0 && start <= SECONDS_IN_DAY) {
            this._start_time = start;
        }

        return this;
    }

    setEndTime(end: number | null): FilterBuilder {
        if (end !== null && end >= 0 && end <= SECONDS_IN_DAY) {
            this._end_time = end;
        }
        return this;
    }

    setSpecificDaysFree(days_free: MeetingDay[]): FilterBuilder {
        this._days_free = days_free;
        return this;
    }

    setMinDaysFree(num_days_free: number | null): FilterBuilder {
        if (num_days_free !== null && num_days_free >= 0) {
            this._min_num_days_free = num_days_free;
        }
        return this;
    }

    setSeatsLeft(seats_left: number | null): FilterBuilder {
        if (seats_left !== null && seats_left >= 0) {
            this._min_seats_left = seats_left;
        }
        return this;
    }

    setMinHonorsCourses(min_honors_courses: number | null): FilterBuilder {
        // We might want to allow a '-1', to signify NO honors courses allowed
        if (min_honors_courses !== null && min_honors_courses >= 0) {
            this._min_honors_courses = min_honors_courses;
        }
        return this;
    }

    build(): Filter {
        // When in doubt - the number of explicit days free takes precedence
        this._min_num_days_free = Math.max(
            this._min_num_days_free || 0,
            this._days_free.length
        );
        return new Filter(this);
    }
}

export class Filter {
    // Earliest start time
    readonly start_time: number;
    // Latest end time
    readonly end_time: number;
    // The record of which days are free and which aren't
    readonly days_free: Set<MeetingDay>;
    // The number of days free we want (doesn't matter which ones)
    readonly min_num_days_free: number;
    // The MINIMUM number of seats free we want
    readonly min_seats_left: number;
    // The minimum number of honors courses a schedule should have
    readonly min_honors_courses: number;
    // A time string, matching the format of BinaryMeetingTime (but without start/end dates)
    readonly times: string;

    constructor(builder: FilterBuilder) {
        // We add/subtract 1, to prevent overlap. If someone wants 9:30 as the latest start time,
        //      they'd input 9:30, but that strictly overlaps with a a class starting at 9:30.
        // So, we adjust the bounds by 1, so they get the behavior they ACTUALLY wanted
        this.start_time = builder._start_time - 1;
        this.end_time = builder._end_time + 1;
        this.days_free = new Set(builder._days_free);
        this.min_num_days_free = builder._min_num_days_free;
        this.min_seats_left = builder._min_seats_left;
        this.min_honors_courses = builder._min_honors_courses;
        this.times = this.createTimeString();
    }

    createTimeString(): string {
        const time_string: string[] = [];

        for (const day of Object.values(MeetingDay)) {
            // Handle the case where the entire day is blocked off
            if (this.days_free.has(day)) {
                time_string.push(new Array(INTERVALS_IN_DAY).fill(1).join(""));
                continue;
            }

            // Now, handle the start and end times
            const times = new Array(INTERVALS_IN_DAY).fill(0);

            for (let interval = 0; interval < INTERVALS_IN_DAY; interval++) {
                const interval_time = interval * INTERVAL_LENGTH;
                if (
                    interval_time < this.start_time ||
                    interval_time > this.end_time
                ) {
                    times[interval] = 1;
                }
            }

            time_string.push(times.join(""));
        }

        return time_string.join("");
    }

    checkSectionCompatibility(section: ParsedSection): boolean {
        // Check for start time, end time, and specific days off
        if (!section.meetings.compatibleWithFilter(this)) {
            return false;
        }

        // Check for the number of seats left
        if (section.seatsRemaining < this.min_seats_left) {
            return false;
        }
        return true;
    }

    checkCompatibility(result: ParsedSection[]): boolean {
        // Double-check to make sure each section is OK
        if (!result.every((s) => this.checkSectionCompatibility(s))) {
            return false;
        }

        // Check that the number of days match
        const days_occupied: Set<MeetingDay> = new Set();
        for (const section of result) {
            section.meetings.days.forEach((elem) => days_occupied.add(elem));
        }

        const days_free = Object.values(MeetingDay).length - days_occupied.size;
        if (days_free < this.min_num_days_free) {
            return false;
        }

        // Check that the number of honors courses match
        const honors = result.reduce(
            (acc, cur) => acc + (cur.honors ? 1 : 0),
            0
        );
        if (honors < this.min_honors_courses) {
            return false;
        }

        return true;
    }
}
