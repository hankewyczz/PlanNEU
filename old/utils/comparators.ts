///////////////////////////////
///// Sorting Comparators /////
///////////////////////////////

function comparatorFromString(
  compStr: string
): (r1: Result, r2: Result) => number {
  switch (compStr) {
    case "seatsLeft":
      return compareSeatsLeft;
    case "daysOff":
      return compareDaysOff;
    case "startTime":
      return compareStartTime;
    case "endTime":
      return compareEndTime;
    case "honorsCourses":
      return compareHonorsCourses;
    default:
      throw new Error("Unknown comparator type");
  }
}

/**
 * Compares two Results by the number of days off.
 * @param  {Result} r1 The first Result
 * @param  {Result} r2 The second Result
 * @return {number}    The result of the comparison
 */
function compareDaysOff(r1: Result, r2: Result): number {
  // We want the result with the LARGEST number of days off to come first
  return r2.daysOff - r1.daysOff;
}

/**
 * Compares two Results by the latest start time.
 * @param  {Result} r1 The first result
 * @param  {Result} r2 The second result
 * @return {number}    The result of the comparison
 */
function compareStartTime(r1: Result, r2: Result): number {
  // We want the latest (largest) start time first
  return r2.earliestStart - r1.earliestStart;
}

/**
 * Compares two Results by the earliest end time.
 * @param  {Result} r1 The first Result
 * @param  {Result} r2 The second Result
 * @return {number}    The result of the comparison
 */
function compareEndTime(r1: Result, r2: Result): number {
  // We want the earliest (smallest) end time first
  return r1.latestEnd - r2.latestEnd;
}

/**
 * Compares two Results by the number of seats left
 * @param  {Result} r1 The first Result
 * @param  {Result} r2 The second Result
 * @return {number}    The result of the comparison
 */
function compareSeatsLeft(r1: Result, r2: Result): number {
  return r2.minSeatsLeft - r1.minSeatsLeft;
}

/**
 * Compares two Results by the number of honors courses.
 * @param  {Result} r1 The first Result
 * @param  {Result} r2 The second Result
 * @return {number}    The result of the comparison
 */
function compareHonorsCourses(r1: Result, r2: Result): number {
  return r2.honorsCount - r1.honorsCount;
}
