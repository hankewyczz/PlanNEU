"use strict";
//A single Section.
class Section {
    // Constructor
    constructor(course, content) {
        // Initialize
        this.content = content;
        // Details
        this.crn = this.content.crn;
        this.courseName = course.name;
        this.fullCourseName = course.fullName;
        // Get only the class meetings
        let meetings = content.meetings.filter((obj) => obj.type === "Class");
        if (meetings.length > 0) {
            this.times = new Times(meetings[0]["times"]);
        }
        else {
            throw new Error("No meeting times found");
        }
    }
    // Gets all meeting times
    getTimes() {
        return this.times;
    }
}
/*
Section times
*/
class Times {
    // Constructor
    constructor(times) {
        this.earliestStart = MAX_TIME;
        this.latestEnd = MIN_TIME;
        this.content = {};
        this.days = Object.keys(times);
        for (let i = 0; i < this.days.length; i++) {
            let output = [];
            for (let j = 0; j < times[this.days[i]].length; j++) {
                let time = new Time(times[this.days[i]][j]);
                output.push(time);
                // Update min and max times
                this.earliestStart = (time.start < this.earliestStart) ? time.start : this.earliestStart;
                this.latestEnd = (time.end > this.latestEnd) ? time.end : this.latestEnd;
            }
            // Add to the content object
            this.content[this.days[i]] = output;
        }
    }
}
/*
A single time range
*/
class Time {
    constructor(times) {
        this.start = times["start"];
        this.end = times["end"];
    }
}
