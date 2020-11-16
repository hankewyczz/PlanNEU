"use strict";
// Keeps track of all the classes the user has added
var USER_SECTIONS = {};
//////////////////////////////////////////////////
////////    Dealing with USER_SECTIONS     ////////
//////////////////////////////////////////////////
/*
A single Section.
*/
class Section {
    // Constructor
    constructor(crn, courseName, content) {
        this.crn = crn;
        this.courseName = courseName;
        this.content = content;
        let meetingTimes = null;
        let meetings = this.content["meetings"];
        let keys = Object.keys(meetings);
        for (let i = 0; i < keys.length; i++) {
            if (meetings[keys[i]]["type"] == "Class") {
                meetingTimes = new Times(meetings[keys[i]]["times"]);
            }
        }
        if (meetingTimes == null) {
            throw new Error("No times found");
        }
        this.times = meetingTimes;
    }
    alreadySaved(sectionCrn) {
        return this.crn in USER_SECTIONS;
    }
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
                if (time.start < this.earliestStart) {
                    this.earliestStart = time.start;
                }
                if (time.end > this.latestEnd) {
                    this.latestEnd = time.end;
                }
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
/*
Removes a section which has already been gotten
    - sectionCrn (String): The CRN of the section
    - @return (void)
*/
function removeSavedSection(sectionCrn) {
    delete USER_SECTIONS[sectionCrn];
}
/*
Gets the section data from a section which has already been added
    - sectionCrn (String): The CRN of the section
    - @return (Section): The section
    - @throws If the section has not been added yet
*/
function getSavedSection(sectionCrn) {
    try {
        return USER_SECTIONS[sectionCrn];
    }
    catch (err) {
        throw new Error("Class has not yet been added");
    }
}
/*
Adds a new Section
    - section (Section): The section which we're adding to the dictionary
    - @return (void)
*/
function saveSection(section) {
    USER_SECTIONS[section.crn] = section;
}
