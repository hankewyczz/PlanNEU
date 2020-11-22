///////////////////////////////
///// Sorting Comparators /////
///////////////////////////////


/**
 * Compares two Results by the number of days off.
 * @param  {Result} r1 The first Result
 * @param  {Result} r2 The second Result
 * @return {number}    The result of the comparison
 */	
function compareDaysOff(r1: Result, r2: Result): number {
	return r1.daysOff - r2.daysOff;
}


/**
 * Compares two Results by the latest start time.
 * @param  {Result} r1 The first result
 * @param  {Result} r2 The second result
 * @return {number}    The result of the comparison
 */
function compareStartTime(r1: Result, r2: Result): number {
	// We want the latest (largest) start time first
	return r1.earliestStart - r2.earliestStart;
}


/**
 * Compares two Results by the earliest end time.
 * @param  {Result} r1 The first Result
 * @param  {Result} r2 The second Result
 * @return {number}    The result of the comparison
 */
function compareEndTime(r1: Result, r2: Result): number {
	// We want the earliest (smallest) end time first
	return r2.latestEnd - r1.latestEnd;
}


/**
 * Compares two Results by the number of seats left
 * @param  {Result} r1 The first Result
 * @param  {Result} r2 The second Result
 * @return {number}    The result of the comparison
 */
function compareSeatsLeft(r1: Result, r2: Result): number {
	return r1.minSeatsLeft - r2.minSeatsLeft;
}


/**
 * Compares two Results by the number of honors courses.
 * @param  {Result} r1 The first Result
 * @param  {Result} r2 The second Result
 * @return {number}    The result of the comparison
 */
function compareHonorsCourses(r1: Result, r2: Result): number {
	return r1.honorsCount - r2.honorsCount;
}