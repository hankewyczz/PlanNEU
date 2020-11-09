"use strict";
/* Checks if two Sections overlap (time-based) */
function sectionsOverlap(s1, s2) {
    let s1Times = s1.content["meetings"]["times"];
    let s2Times = s2.content["meetings"]["times"];
    // The days at which this section meets
    let s1Days = Object.keys(s1Times);
    let s2Days = Object.keys(s2Times);
    for (let i = 0; i < s1Days.length; i++) {
        for (let j = 0; j < s2Days.length; j++) {
            // Same day
            let day1 = s1Days[i];
            let day2 = s2Days[j];
            // Check if this is the same day
            if (day1 == day2) {
                if (timesOverlap(s1Times[day1], s2Times[day2])) {
                    return true;
                }
            }
        }
    }
    // If we get here, they don't overlap
    return false;
}
/*
Checks if two time ranges overlap
*/
function timesOverlap(s1Times, s2Times) {
    let start1 = new Number(s1Times["start"]);
    let end1 = new Number(s1Times["end"]);
    let start2 = new Number(s2Times["start"]);
    let end2 = new Number(s2Times["start"]);
    // Check for any type of possible overlap (if any of these are true, there is overlap)
    return ((start1 >= start2 && start1 <= end2) // start1 is between start2 and end2
        || (end1 >= start2 && end1 <= end2) // end1 is between start2 and end2
        || (start2 >= start1 && start2 <= end1) // start2 is between start1 and end1
        || (end2 >= start1 && end2 <= end1)); // end2 is between start1 and end1
}
