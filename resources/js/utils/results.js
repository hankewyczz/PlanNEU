"use strict";
/*
A schedule Result.
*/
class Result {
    // Constructor
    constructor(sections) {
        this.sections = sections;
        this.sectionLinks = [];
        this.days = { "1": {}, "2": {}, "3": {}, "4": {}, "5": {} };
        for (let sec of sections) {
            // Create the initial string
            this.sectionLinks.push(this.courseLink(sec));
            // Deal with the schedule
            let times = sec.times;
            // For each day
            for (let day of times.days) {
                // For each meeting
                for (let meetTime of times.content[day]) {
                    this.days[day][meetTime.start] = this.timeStr(meetTime, sec);
                }
            }
        }
    }
    timeStr(time, section) {
        return `${secsToHM(time.start)} - ${secsToHM(time.end)} | ${section.fullName}`;
    }
    courseLink(section) {
        let out = `<a href="${section.content["url"]}">${section.crn}</a>: ${section.content.subject} ${section.content.classId}`;
        out += (section.content["online"]) ? " (Online)<br>" : "<br>";
        return out;
    }
    toString() {
        let out = "";
        for (let i = 0; i < this.sectionLinks.length; i++) {
            out += this.sectionLinks[i];
        }
        out += "<hr>";
        let dayToStr = { "1": "Monday", "2": "Tuesday",
            "3": "Wednesday", "4": "Thursday", "5": "Friday" };
        let days = Object.keys(this.days);
        for (let i = 0; i < days.length; i++) {
            // Check if we have anything this day
            if (Object.keys(this.days[days[i]]).length == 0) {
                continue; // Empty day
            }
            out += `<b>${dayToStr[days[i]]}</b>`;
            out += "<ul>";
            let dayMeetings = this.days[days[i]];
            let meetings = Object.keys(dayMeetings);
            meetings.sort();
            for (let j = 0; j < meetings.length; j++) {
                out += `<li>${dayMeetings[meetings[j]]}</li>`;
            }
            out += "</ul>";
        }
        return out;
    }
}
/* Converts seconds to HH:MM string */
function secsToHM(seconds) {
    let date = new Date(seconds * 1000);
    // We want 12 hour time
    let hours = parseInt(date.toISOString().substr(11, 2)) % 12;
    return `${hours.toString().padStart(2, "0")}:${date.toISOString().substr(14, 2)}`;
}
