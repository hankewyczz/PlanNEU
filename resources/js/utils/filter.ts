// Min and max course times
const MIN_TIME: number = 0;
const MAX_TIME: number = 86340; 



// Filters Sections based on predicates
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
		for (const predicate of this.filters) {
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



/* Checks if these sections have any honors courses */
function anyHonors(sections: Section[]): boolean {
	for (const section of sections) {
		if (section.content["honors"]) {
			return true;
		}
	}

	return false;
}


/* Checks if we meet the minimum required honors courses */
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


/* Checks if these sections is within the valid time range */
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


/* Checks if these sections all have seats left */
function isSeatsLeft(sections: Section[]): boolean {
	for (const section of sections) {
		if (section.content["seatsRemaining"] <= 0) {
			return false;
		}
	}
	return true;
}


/* Checks if we have enough days off */
function enoughDaysOff(sections: Section[], numDays: number = 0, days: string[] = []): boolean {
	// If it's the defaults, we just return true
	if (numDays === 0 && days.length === 0) {
		return true;
	}

	/* No possible way for this to be true */
	if (numDays < days.length) {
		return false;
	}

	/* Checks if the day is free */
	let dayFree: { [key: string]: boolean } = { "1": true, "2": true, "3": true, "4": true, "5": true };

	for (const section of sections) {
		// Update each day
		for (const day of section.times.days) {
			// If we have anything on this day, it is no longer free
			dayFree[day] = false;
		}
	}

	for (const day of days) {
		if (!(dayFree[day])) {	// If we need this day to be free, and it isn't, throw an error
			return false;
		}
	}

	// Now, we check if this meets our requirements
	let count: number = 0;

	for (const day of Object.values(dayFree)) {
		count += day ? 1 : 0;
	}

	// Check if we have enough days off
	return count >= numDays;
}