// Min and max course times
const MIN_TIME: number = 0;
const MAX_TIME: number = 86340; 



/**
 * Filters a Result based on predicates.
 */
class Filter {
	filters: ((r: Result) => boolean)[];

	// Construct with an empty filters array
	constructor() {
		this.filters = [];
	}

	// Adds a filter
	add(func: ((r: Result) => boolean)) {
		this.filters.push(func);
	}

	// Evaluates an array of functions
	func(r: Result): boolean {
		for (let predicate of this.filters) {
			if (!predicate(r)) {
				return false;
			}
		}
		return true;
	}	
}








//////////////////////
///// Predicates /////
//////////////////////


/**
 * Checks if these sections have any honors courses
 * @param  {Result} result 		The Result we're checking
 * @return {boolean}            A boolean indicating if this list of Sections contains any Sections which are Honors
 */
function anyHonors(result: Result): boolean {
	return result.honorsCount > 0;
}


/**
 * Checks if we meet the minimum required honors courses
 * @param  {Result}	 result 	   The Result we're checking
 * @param  {number = 0}  minHonors The minimum number of honors Sections we want
 * @return {boolean}            A boolean indicating if this list has at least this many Honors Sections
 */
function meetsMinHonorsReq(result: Result, minHonors: number = 0): boolean {
	return result.honorsCount >= minHonors;
}



/**
 * Checks if these sections is within the valid time range
 * @param  {Result} 			  result The Result we're checking
 * @param  {number = MIN_TIME}    start The start time of this range
 * @param  {number = MAX_TIME}    end   The end time of this range
 * @return {boolean}            Whether all of the Sections are in the valid time range or not
 */
function isValidTime(result: Result, start: number = MIN_TIME, end: number = MAX_TIME): boolean {
	return (result.earliestStart >= start) && (result.latestEnd <= end);
}


/**
 * Checks if these sections all have seats left
 * @param  {Result} 	result  The Result we're checking
 * @return {boolean}            Whether all of these Sections have seats left or not
 */
function isSeatsLeft(result: Result): boolean {
	return result.minSeatsLeft > 0;
}


/**
 * Checks if we have enough days off
 * @param  {Result}          result The Result we're checking
 * @param  {number   = 0}	numDays The number of days we want off
 * @param  {string[] = []}  daysOff    The specific days we want off
 * @return {boolean}        		Whether or not we have enough days off (and the specific days)
 */
function enoughDaysOff(result: Result, numDays: number = 0, daysOff: string[] = []): boolean {
	/* No possible way for this to be true */
	if (numDays < daysOff.length) {
		return false;
	}


	for (let day of daysOff) {
		// If this day is not free, return false
		if (!(result.areDaysFree[day])) {
			return false;
		}
	}
	

	// Check if we have enough days off
	return result.daysOff >= numDays;
}