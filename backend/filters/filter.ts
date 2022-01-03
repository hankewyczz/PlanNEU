import { BinaryMeetingTime } from "../parsers/meetingTimes";
import { MeetingDay, ParsedSection } from "../types/types";
import { INTERVALS_IN_DAY, INTERVAL_LENGTH, SECONDS_IN_DAY } from "../utils/global";

/**
 * A Builder for the Filter class. Most of the filter arguments are optional, so this is easier than
 * manually constructing Filter instances.
 */
export class FilterBuilder {
    // These default values will not filter ANYTHING
    _start_time = 0;
    _end_time = SECONDS_IN_DAY;
    _specific_days_free: MeetingDay[] = [];
    _min_num_days_free = 0;
    _min_seats_left = 0;
    _min_honors_courses = 0;

    constructor() {
        return this;
    }

    /**
     * Sets the earliest start time (inclusive) we wish to include.
     * @param start The start time in seconds, or null (has no effect on the start time)
     * @returns this, for ease of chaining
     */
    setStartTime(start: number | null): FilterBuilder {
        // Null check, and ensuring that the number is a valid one
        if (start !== null && start >= 0 && start <= SECONDS_IN_DAY) {
            this._start_time = start;
        }

        return this;
    }

    /**
     * Sets the latest end time (inclusive) we wish to consider.
     * @param end The end time in seconds, or null (no effect)
     * @returns this, for chaining
     */
    setEndTime(end: number | null): FilterBuilder {
        // Null & validity check
        if (end !== null && end >= 0 && end <= SECONDS_IN_DAY) {
            this._end_time = end;
        }
        return this;
    }

    /**
     * Sets the specific days which we want free
     * @param days_free The specific days of the week, on which we should have no meetings
     * @returns this
     */
    setSpecificDaysFree(days_free: MeetingDay[]): FilterBuilder {
        this._specific_days_free = days_free;
        return this;
    }

    /**
     * Sets the minimum number of days we want free
     * @param num_days_free The **minimum** number of days free we want in the schedule
     * @returns this
     */
    setMinDaysFree(num_days_free: number | null): FilterBuilder {
        // Null & validity check
        if (num_days_free !== null && num_days_free >= 0) {
            this._min_num_days_free = num_days_free;
        }
        return this;
    }

    /**
     * Sets the min. number of seats we want in every section in a schedule
     * @param seats_left The minimum number of seats left we want to consider
     * @returns this
     */
    setSeatsLeft(seats_left: number | null): FilterBuilder {
        // Null and validity checks
        if (seats_left !== null && seats_left >= 0) {
            this._min_seats_left = seats_left;
        }
        return this;
    }

    /**
     * Sets the minimum number of honors courses we want in a schedule
     * @param min_honors_courses The minimum number of honors courses we want in a schedule
     * @returns this
     */
    setMinHonorsCourses(min_honors_courses: number | null): FilterBuilder {
        // This is really onlt helpful for honors students as is -
        // we might want to allow a '-1', to signify NO honors courses allowed
        if (min_honors_courses !== null && min_honors_courses >= 0) {
            this._min_honors_courses = min_honors_courses;
        }
        return this;
    }

    /**
     * Builds and returns a Filter object
     * @returns A Filter object
     */
    build(): Filter {
        // If there is a conflict, we defer to the number of specific days free
        this._min_num_days_free = Math.max(
            this._min_num_days_free || 0,
            this._specific_days_free.length
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
    readonly specific_days_free: Set<MeetingDay>;
    // The number of days free we want (doesn't matter which ones)
    readonly min_num_days_free: number;
    // The MINIMUM number of seats free we want
    readonly min_seats_left: number;
    // The minimum number of honors courses a schedule should have
    readonly min_honors_courses: number;
    // A BinaryMeetingTime representing the specific days free, and start/end times
    readonly meetings: BinaryMeetingTime;

    constructor(builder: FilterBuilder) {
        // We add/subtract 1, to prevent overlap. Since our intervals are strictly on 5-minute
        //  boundaries, this doesn't expand the selected range at all, but ensures that the start/end
        //  times are inclusive.
        this.start_time = builder._start_time - 1;
        this.end_time = builder._end_time + 1;
        this.specific_days_free = new Set(builder._specific_days_free);
        this.min_num_days_free = builder._min_num_days_free;
        this.min_seats_left = builder._min_seats_left;
        this.min_honors_courses = builder._min_honors_courses;
        this.meetings = this.createBinaryMeeting();
    }

    /**
     * Represents the blocked-off times of this Filter in a BinaryMeetingTime format
     * @returns A BinaryMeetingTime representing the days free, and the start/end times of this Filter
     */
    createBinaryMeeting(): BinaryMeetingTime {
        const time_string: string[] = [];

        for (const day of Object.values(MeetingDay)) {
            // Handle the case where the entire day is blocked off
            if (this.specific_days_free.has(day)) {
                time_string.push(new Array(INTERVALS_IN_DAY).fill(1).join(""));
                continue;
            }

            // Now, handle the start and end times
            const times = new Array(INTERVALS_IN_DAY).fill(0);

            for (let interval = 0; interval < INTERVALS_IN_DAY; interval++) {
                const interval_time = interval * INTERVAL_LENGTH;
                if (interval_time < this.start_time || interval_time > this.end_time) {
                    times[interval] = 1;
                }
            }

            time_string.push(times.join(""));
        }

        return new BinaryMeetingTime(time_string.join(""));
    }

    /**
     * Checks if a meeting is compatible with this Filter
     * @param meeting A meeting to compare to this filter
     * @returns A boolean indicating if this meeting is compatible
     */
    meetingCompatible(meeting: BinaryMeetingTime): boolean {
        return BinaryMeetingTime.combine(meeting, this.meetings) instanceof BinaryMeetingTime;
    }

    /**
     * Given a list of days, checks if this Filter can be compatible if all those days have meetings
     * @param days The days on which the schedule MUST have a meeting
     * @returns A boolean indicating if this Filter is compatible with the given days
     */
    daysCompatible(days: Set<MeetingDay>): boolean {
        // Check if the blocked-off days exceed the min number of free days
        const days_free = Object.values(MeetingDay).length - days.size;
        if (days_free < this.min_num_days_free) {
            return false;
        }

        // Check if the combined meeting is a valid one
        return this.meetingCompatible(BinaryMeetingTime.fromMeetingDays(days))
    }

    /**
     * Checks compatibility between a single ParsedSection and this FIlter
     * @param section The section to check compatibility against
     * @returns A boolean indicatng if this section is compatible with this filter
     */
    sectionCompatible(section: ParsedSection): boolean {
        // Check for start time, end time, and specific days off
        if (!this.meetingCompatible(section.meetings)) {
            return false;
        }

        // Check for the number of seats left
        if (section.seatsRemaining < this.min_seats_left) {
            return false;
        }
        return true;
    }

    /**
     * Checks compatibility between a given schedule and this Filter
     * @param result A list of ParsedSections, representing a schedule
     * @returns A boolean indicating if this schedule is compatible with this Filter
     */
    resultCompatible(result: ParsedSection[]): boolean {
        // Double-check to make sure each section is OK
        if (!result.every((s) => this.sectionCompatible(s))) {
            return false;
        }

        // Check that the number of days match
        const days_occupied: Set<MeetingDay> = new Set();
        for (const section of result) {
            section.meetings.days().forEach((elem) => days_occupied.add(elem));
        }

        const days_free = Object.values(MeetingDay).length - days_occupied.size;
        if (days_free < this.min_num_days_free) {
            return false;
        }

        // Check that the number of honors courses match
        const honors = result.reduce((acc, cur) => acc + (cur.honors ? 1 : 0), 0);
        if (honors < this.min_honors_courses) {
            return false;
        }

        return true;
    }
}
