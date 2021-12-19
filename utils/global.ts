import { Result } from "../types/types";

export const SECONDS_IN_DAY = 86400;

// To optimize the interval overlap checking, we assume that each interval is composed of blocks no smaller than INTERVAL_BLOCK_SIZE seconds (so, 5 mins)
export const INTERVAL_LENGTH = 300;
export const INTERVALS_IN_DAY = SECONDS_IN_DAY / INTERVAL_LENGTH;


// Limit the number of courses for which we generate results
export const MAX_COURSES = 8;
// Limit the number of possibilities per query - if the user wants more specific results, they can use filters. 
// This is better than limiting sections, since there might be very uneven section counts
// eg. if one class has 1 section and another has 40, the second is limited, even though this is still within the bounds
//  of work that we're OK with doing
export const MAX_POSSIBILITIES = 100_000;

// THe number of results we should generate at a time
export const NUM_RESULTS = 50;


/**
 * It's pretty annoying that Jest doesn't have a way to check for deep unordered array equality.
 */
export function resultsEquality(array1: Result[], array2: Result[]) {
    const arr1 = array1.map(result => result.sort()).sort();
    const arr2 = array2.map(result => result.sort()).sort();
    
    expect(JSON.stringify(arr1)).toEqual(JSON.stringify(arr2));
}