"use strict";
// Min and max course times
const MIN_TIME = 0;
const MAX_TIME = 86400;
/* Checks if we meet the minimum required honors courses */
function isMinHonors(sections, minHonors = 0) {
    // If the min number of honors courses is 0, it's always true
    if (minHonors === 0) {
        return true;
    }
    let count = 0;
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].content["honors"]) {
            count++;
        }
    }
    return count >= minHonors;
}
/* Checks if this Section is within the valid time range */
function isValidTime(sections, start = MIN_TIME, end = MAX_TIME) {
    // Start is initialized to 00:00, and end is initialized to 24:00
    // If we're outside of this range, it's always true
    if (start <= MIN_TIME && end >= MAX_TIME) {
        return true;
    }
    for (let i = 0; i < sections.length; i++) {
        let times = sections[i].getTimes();
        // If we're out of bounds, this isn't a valid time
        if (times.earliestStart < MIN_TIME || times.latestEnd > MAX_TIME) {
            return false;
        }
    }
    return true;
}
