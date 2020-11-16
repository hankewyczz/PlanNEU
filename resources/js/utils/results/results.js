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
        for (let i = 0; i < sections.length; i++) {
            // Create the initial string
            this.sectionLinks.push(this.courseLink(sections[i]));
            // Deal with the schedule
            let times = sections[i].getTimes();
            for (let j = 0; j < times.days.length; j++) {
                let day = times.days[j];
                let timeArr = times.content[day];
                for (let k = 0; k < timeArr.length; k++) {
                    let meetTime = timeArr[k];
                    this.days[day][meetTime.start] = this.timeStr(meetTime, sections[i]);
                }
            }
        }
    }
    timeStr(time, section) {
        return `${secsToHM(time.start)}-${secsToHM(time.end)} &mdash; ${section.courseName}`;
    }
    courseLink(section) {
        let fullName = getCourseName(getSavedCourse(section.courseName));
        let out = `<a href="${section.content["url"]}">${section.crn}</a>: ${fullName}`;
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
    var date = new Date(seconds * 1000);
    return date.toISOString().substr(11, 5);
}
