export const SECONDS_IN_DAY = 86400;

// To optimize the interval overlap checking, we assume that each interval is composed of blocks no smaller than INTERVAL_BLOCK_SIZE seconds (so, 5 mins)
export const INTERVAL_LENGTH = 300;
export const INTERVALS_IN_DAY = SECONDS_IN_DAY / INTERVAL_LENGTH;


// Limit the number of courses and sections for which we generate results
// At most, we generate 4^8 possibilities, ~70k.
// If the user wants more specific results, they can use filters. 
export const MAX_COURSES = 8;
export const MAX_SECTIONS_PER_COURSE = 4;