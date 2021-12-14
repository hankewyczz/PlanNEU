export const SECONDS_IN_DAY = 86400;

// To optimize the interval overlap checking, we assume that each interval is composed of blocks no smaller than INTERVAL_BLOCK_SIZE seconds (so, 5 mins)
export const INTERVAL_LENGTH = 300;
export const INTERVALS_IN_DAY = SECONDS_IN_DAY / INTERVAL_LENGTH;