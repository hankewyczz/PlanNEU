// Min and max course times
const MIN_TIME: number = 0;
const MAX_TIME: number = 86340; 



/**
 * Filters Sections based on predicates.
 */
class Filter {
	filters: ((s: Section[]) => boolean)[];

	// Construct with an empty filters array
	constructor() {
		this.filters = [];
	}

	// Adds a filter
	add(func: ((s: Section[]) => boolean)) {
		this.filters.push(func);
	}

	// Evaluates an array of functions
	func(s: Section[]): boolean {
		for (let predicate of this.filters) {
			if (!predicate(s)) {
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
 * @param  {Section[]} sections The list of Sections
 * @return {boolean}            A boolean indicating if this list of Sections contains any Sections which are Honors
 */
function anyHonors(sections: Section[]): boolean {
	for (const section of sections) {
		if (section.content["honors"]) {
			return true;
		}
	}
	return false;
}


/**
 * Checks if we meet the minimum required honors courses
 * @param  {Section[]}	 sections The list of Sections
 * @param  {number = 0}  minHonors The minimum number of honors Sections we want
 * @return {boolean}            A boolean indicating if this list has at least this many Honors Sections
 */
function meetsMinHonorsReq(sections: Section[], minHonors: number = 0): boolean {
	// If the min number of honors courses is 0, it's always true
	if (minHonors === 0 || sections.length === 0) {
		return true;
	}

	// No possible way for this to be true
	if (minHonors > sections.length) {
		return false;
	}

	// If this is an honors section - return 1, else 0
	const countArr: number[] = sections.map((a) => a.content["honors"] ? 1 : 0);
	// Sum up the array to get the number of honors courses
	const count: number = countArr.reduce((a, b) => a + b, 0);

	return count >= minHonors;
}


/**
 * Checks if these sections is within the valid time range
 * @param  {Section[]} 			  sections The list of Sections
 * @param  {number = MIN_TIME}    start The start time of this range
 * @param  {number = MAX_TIME}    end   The end time of this range
 * @return {boolean}            Whether all of the Sections are in the valid time range or not
 */
function isValidTime(sections: Section[], start: number = MIN_TIME, end: number = MAX_TIME): boolean {
	// Start is initialized to 00:00, and end is initialized to 24:00
	// If we're outside of this range, it's always true
	if (start <= MIN_TIME && end >= MAX_TIME) {
		return true;
	}

	for (const section of sections) {
		const times: Times = section.times;

		// If we're out of bounds, this isn't a valid time
		if (times.earliestStart < start || times.latestEnd > end) {
			return false;
		}
	}
	return true;
}


/**
 * Checks if these sections all have seats left
 * @param  {Section[]} sections The list of Sections
 * @return {boolean}            Whether all of these Sections have seats left or not
 */
function isSeatsLeft(sections: Section[]): boolean {
	for (const section of sections) {
		if (section.content["seatsRemaining"] <= 0) {
			return false;
		}
	}
	return true;
}


/**
 * Checks if we have enough days off
 * @param  {Section[]}   sections The list of Sections
 * @param  {number   = 0}	numDays The number of days we want off
 * @param  {string[] = []}  daysOff    The specific days we want off
 * @return {boolean}        		Whether or not we have enough days off (and the specific days)
 */
function enoughDaysOff(sections: Section[], numDays: number = 0, daysOff: string[] = []): boolean {
	/* No possible way for this to be true */
	if (numDays < daysOff.length) {
		return false;
	}

	// If it's the defaults, we just return true
	if (numDays === 0) {
		return true;
	}


	const days: string[] = ["1", "2", "3", "4", "5"];

	let count = 0;

	for (let day of days) {
		if (isDayOff(sections, day)) {
			count++;
		}
		else {
			// Is this one of the specific days we want off?
			if (daysOff.includes(day)) {	
				return false;
			}
		}
	}
	

	// Check if we have enough days off
	return count >= numDays;
}



function isDayOff(sections: Section[], day: string): boolean {
	for (const section of sections) {
		// Update each day
		for (const secDay of section.times.days) {
			// If we have anything on this day, it is no longer free
			if (secDay == day) {
				return false;
			}
		}
	}

	// If we get here, it's true
	return true;
}