"use strict";
/**
 * Represents all of the meeting times for a Section.
 */
class Times {
    /**
     * Creates an instance of a Times.
     * @param times The object containing all of the times.
     */
    constructor(times) {
        this.earliestStart = MAX_TIME;
        this.latestEnd = MIN_TIME;
        this.content = {};
        this.days = Object.keys(times);
        // Iterate over all the days
        for (const day of this.days) {
            let output = [];
            // Iterate over all the meetings in this day
            for (const meeting of times[day]) {
                const time = new Time(meeting);
                output.push(time);
                // Update min and max times
                this.earliestStart = (time.start < this.earliestStart) ? time.start : this.earliestStart;
                this.latestEnd = (time.end > this.latestEnd) ? time.end : this.latestEnd;
            }
            // Add to the content object
            this.content[day] = output;
        }
    }
}
/**
 * A single time (of a single meeting).
 */
class Time {
    /**
     * Constructs a Time.
     * @param times    The object containing the times.
     */
    constructor(times) {
        this.start = times["start"];
        this.end = times["end"];
    }
}
