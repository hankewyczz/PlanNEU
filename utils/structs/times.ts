/**
 * Represents a single Meeting of a Section (eg. lecture, exam)
 */
interface IMeeting {
    type: string;
    times: { [key: string]: IMeetingTime[] };
    where: string;
    endDate: number;
    startDate: number;
}

interface IMeetingTime {
    end: number;
    start: number;
}


/**
 * Represents all of the meeting times for a Section.
 */
class Times {
    earliestStart: number = MAX_TIME;
    latestEnd: number = MIN_TIME;

    days: string[];
    content: { [key: string]: Time[] } = {};

    /**
     * Creates an instance of a Times.
     * @param times The object containing all of the times.
     */
    constructor(times: { [key: string]: IMeetingTime[] }) {
        this.days = Object.keys(times);

        // Iterate over all the days
        for (const day of this.days) {

            let output: Time[] = [];

            // Iterate over all the meetings in this day
            for (const meeting of times[day]) {
                const time: Time = new Time(meeting);

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
class Time implements IMeetingTime {
    start: number;
    end: number;

    /**
     * Constructs a Time.
     * @param times    The object containing the times.
     */
    constructor(times: IMeetingTime) {
        this.start = times["start"];
        this.end = times["end"];
    }
}