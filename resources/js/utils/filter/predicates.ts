// Min and max course times
const MIN_TIME: number = 0;
const MAX_TIME: number = 86340;


/* Checks if these sections have any honors courses */
function anyHonors(sections: Section[]): boolean {
	for (let i = 0; i < sections.length; i++) {
		if (sections[i].content["honors"]) {
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
	let countArr: number[] = sections.map((a) => a.content["honors"] ? 1 : 0);
	// Sum up the array to get the number of honors courses
	let count: number = countArr.reduce((a, b) => a + b, 0);

	return count >= minHonors;
}


/* Checks if these sections is within the valid time range */
function isValidTime(sections: Section[], start: number = MIN_TIME, end: number = MAX_TIME): boolean {
	// Start is initialized to 00:00, and end is initialized to 24:00
	// If we're outside of this range, it's always true
	if (start <= MIN_TIME && end >= MAX_TIME) {
		return true;
	}

	for (let section of sections) {
		let times: Times = section.getTimes();

		// If we're out of bounds, this isn't a valid time
		if (times.earliestStart < start || times.latestEnd > end) {
			return false;
		}
	}
	return true;
}


/* Checks if these sections all have seats left */
function isSeatsLeft(sections: Section[]): boolean {
	for (let i = 0; i < sections.length; i++) {
		if (sections[i].content["seatsRemaining"] <= 0) {
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

	for (let i = 0; i < sections.length; i++) {
		let secDays: string[] = sections[i].getTimes().days;
		// Update each day
		for (let j = 0; j < secDays.length; j++) {
			// If we have anything on this day, it is no longer free
			dayFree[secDays[j]] = false;
		}
	}

	for (let i = 0; i < days.length; i++) {
		if (!(dayFree[days[i]])) {	// If we need this day to be free, and it isn't, throw an error
			return false;
		}
	}

	// Now, we check if this meets our requirements
	let daysFreeVals = Object.values(dayFree);
	let count: number = 0;

	for (let i = 0; i < daysFreeVals.length; i++) {
		count += daysFreeVals[i] ? 1 : 0;
	}

	// Check if we have enough days off
	return count >= numDays;
}