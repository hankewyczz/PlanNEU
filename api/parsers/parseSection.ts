import { BackendMeeting, MeetingTime, Section } from "../../types/types";

export function parseSection(section: Section) {

}


/**
 * Counts the number of ones in a binary string
 */
export function countOnes(n: number): number {
    let i = 0;

    while (n > 0) {
        if (n & 1) {
            i++;
        }

        n >>= 1;
    }

    return i;
}

/*
We want to REALLY optimize the process for checking for interval overlaps
The general idea is:
- Each meeting time occurs on a 5-minute boundury
- We can simplify meeting times to a binary string. 
    - Each digit represents a 5-minute block
    - If the meeting is occuring, the digit is 1. Else, 0
- We can check for overlap by calculating: countOnes(a | b) === countOnes(a) + countOnes(b)
*/
function parseMeetingTimes(times: BackendMeeting) {

}