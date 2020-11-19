"use strict";
//A single Section.
class Section {
    // Constructor
    constructor(course, content) {
        // Initialize
        this.content = content;
        // Details
        this.crn = this.content.crn;
        this.subject = course.subject;
        this.courseId = course.courseId;
        this.name = course.name;
        this.fullName = course.fullName;
        // Get only the class meetings
        let meetings = content.meetings.filter((obj) => obj.type === "Class");
        if (meetings.length > 0) {
            this.times = new Times(meetings[0]["times"]);
        }
        else {
            throw new Error("No meeting times found");
        }
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
        // Iterate over all the days
        for (let day of this.days) {
            let output = [];
            // Iterate over all the meetings in this day
            for (let meeting of times[day]) {
                let time = new Time(meeting);
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
/*
A single meeting time
*/
class Time {
    constructor(times) {
        this.start = times["start"];
        this.end = times["end"];
    }
}
/////////////////////////////////
////    Section Utilities    ////
/////////////////////////////////
/* Checks if any sections in an array overlap */
function anySectionsOverlap(sections) {
    for (let i = 0; i < sections.length - 1; i++) {
        for (let j = i + 1; j < sections.length; j++) {
            if (sectionsOverlap(sections[i], sections[j])) {
                return true;
            }
        }
    }
    return false;
}
/* Checks if two Sections overlap (time-based) */
function sectionsOverlap(s1, s2) {
    let s1Times = s1.times;
    let s2Times = s2.times;
    for (let day1 of s1Times.days) {
        for (let day2 of s2Times.days) {
            // Check if this is the same day
            if (day1 == day2) {
                if (anyTimesOverlap(s1Times.content[day1], s2Times.content[day2])) {
                    return true;
                }
            }
        }
    }
    // If we get here, they don't overlap
    return false;
}
// Checks if any number of time ranges overlap
function anyTimesOverlap(s1Times, s2Times) {
    for (let time1 of s1Times) {
        for (let time2 of s2Times) {
            if (timesOverlap(time1, time2)) {
                return true;
            }
        }
    }
    // If we get here, there are no overlaps
    return false;
}
/*
Checks if two time ranges overlap
*/
function timesOverlap(t1, t2) {
    // Check for any type of possible overlap (if any of these are true, there is overlap)
    return ((t1.start >= t2.start && t1.start <= t2.end) // t1.start is between t2.start and t2.end
        || (t1.end >= t2.start && t1.end <= t2.end) // t1.end is between t2.start and t2.end
        || (t2.start >= t1.start && t2.start <= t1.end) // t2.start is between t1.start and t1.end
        || (t2.end >= t1.start && t2.end <= t1.end)); // t2.end is between t1.start and t1.end
}
/* Creates all possible combinations from an array of arrays
https://stackoverflow.com/questions/8936610/how-can-i-create-every-combination-possible-for-the-contents-of-two-arrays
*/
function createCombinations(arrayOfArrays, filter) {
    // Check if the main array is empty, and check if there are any empty inner arrays
    if (arrayOfArrays.length == 0 || arrayOfArrays.filter((s) => s.length === 0).length > 0) {
        return [];
    }
    // We create an empty array of the proper length
    let indices = new Array(arrayOfArrays.length).fill(0);
    let output = [];
    do {
        // Create and push a combination
        let result = formCombination(indices, arrayOfArrays);
        // Check if the sections overlap, or if they don't pass the filter
        if (!anySectionsOverlap(result) && filter.func(result)) {
            output.push(result);
            ;
        }
    } while (odometerIncrement(indices, arrayOfArrays));
    return output;
}
// Take an array of indices, and generate the resulting combination 
function formCombination(indices, arrayOfArrays) {
    // Uses the indices array to create the resulting combination
    return arrayOfArrays.map((arr, index) => arr[indices[index]]);
}
// Incements the array of indices 
function odometerIncrement(indices, arrayOfArrays) {
    // We start with the rightmost index in indices
    for (let i = indices.length - 1; i >= 0; i--) {
        // Here, we check if we can increment without going over the max value
        if (indices[i] + 1 <= arrayOfArrays[i].length - 1) {
            indices[i]++;
            // If we can, we increment and return true
            return true;
        }
        // We can't increment without going over the max
        else {
            // We move one digit to the left (if we can)
            if (i - 1 < 0) {
                // Nothing more to increment -- we're done
                return false;
            }
            else {
                // Cycle this one to 0, and go again with the next one
                indices[i] = 0;
                continue;
            }
        }
    }
    return false;
}
/* Given an array of arrays of Sections, check how many possible combinations there are */
function howManyCombinations(arr) {
    // First, we map to get an array of the lengths of the inner arrays
    // Then, we find (and return) the product of all the lengths
    return arr.map((a) => a.length).reduce((a, b) => a * b, 1);
}
