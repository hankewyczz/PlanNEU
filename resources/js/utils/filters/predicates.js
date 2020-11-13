"use strict";
// Min and max course times
const MIN_TIME = 0;
const MAX_TIME = 86400;
/* Checks if we meet the minimum required honors courses */
function meetsMinHonorsReq(sections, minHonors = 0) {
    // If the min number of honors courses is 0, it's always true
    if (minHonors === 0) {
        return true;
    }
    // If this is an honors section - return 1, else 0
    let countArr = sections.map((a) => a.content["honors"] ? 1 : 0);
    // Sum up the array to get the number of honors courses
    let count = countArr.reduce((a, b) => a + b, 0);
    return count >= minHonors;
}
/* Checks if these sections is within the valid time range */
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
/* Checks if these sections all have seats left */
function isSeatsLeft(sections) {
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].content["seatsRemaining"] <= 0) {
            return false;
        }
    }
    return true;
}
/* Checks if we have enough days off */
function enoughDaysOff(sections, numDays = 0, days = []) {
    // If it's the defaults, we just return true
    if (numDays === 0 && days.length === 0) {
        return true;
    }
    /* Checks if the day is free */
    let dayFree = { "1": true, "2": true, "3": true, "4": true, "5": true };
    for (let i = 0; i < sections.length; i++) {
        let secDays = sections[i].getTimes().days;
        // Update each day
        for (let j = 0; j < secDays.length; j++) {
            // If we have anything on this day, it is no longer free
            dayFree[secDays[j]] = false;
        }
    }
    // Check what days are free
    for (let i = 0; i < days.length; i++) {
        if (!(dayFree[days[i]])) {
            return false;
        }
    }
    // Now, we check if this meets our requirements
    let daysFreeVals = Object.values(dayFree);
    let count = 0;
    for (let i = 0; i < daysFreeVals.length; i++) {
        count += daysFreeVals[i] ? 1 : 0;
    }
    // Check if we have enough days off
    return count >= numDays;
}
