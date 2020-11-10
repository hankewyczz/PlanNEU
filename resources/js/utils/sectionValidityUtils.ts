/* Checks if two Sections overlap (time-based) */
function sectionsOverlap(s1: Section, s2: Section): boolean {
	let s1Times = s1.content["meetings"][0]["times"];
	let s2Times = s2.content["meetings"][0]["times"];

	// The days at which this section meets
	let s1Days: string[] = Object.keys(s1Times);	
	let s2Days: string[] = Object.keys(s2Times);

	for (let i = 0; i < s1Days.length; i++) {
		for (let j = 0; j < s2Days.length; j++) {
			// Same day
			let day1: string = s1Days[i];
			let day2: string = s2Days[j];
			// Check if this is the same day
			if (day1 == day2) {
				if (anyTimesOverlap(s1Times[day1], s2Times[day2])) {
					return true;
				}
			}
		}
	}
	// If we get here, they don't overlap
	return false;
}


/*
Checks if any number of time ranges overlap
*/
function anyTimesOverlap(s1Times: any[], s2Times: any[]): boolean {
	for (let i = 0; i < s1Times.length; i++) {
		for (let j = 0; j < s2Times.length; j++) {
			if (timesOverlap(s1Times[i], s2Times[j])) {
				return true;
			}
		}
	}
	// If we get here, there are no overlaps
	return false;
}


/*
Checks if two time ranges overlap
*/
function timesOverlap(s1Times: { [key: string]: string }, s2Times: { [key: string]: string }): boolean {
	let start1 = new Number(s1Times["start"]);
	let end1 = new Number(s1Times["end"]);
	let start2 = new Number(s2Times["start"]);
	let end2 = new Number(s2Times["end"]);


	// Check for any type of possible overlap (if any of these are true, there is overlap)
	return ((start1 == end1 || start2 == end2)		// Edges overlap
		|| (start1 >= start2 && start1 <= end2) 	// start1 is between start2 and end2
		|| (end1 >= start2 && end1 <= end2)			// end1 is between start2 and end2
		|| (start2 >= start1 && start2 <= end1) 	// start2 is between start1 and end1
		|| (end2 >= start1 && end2 <= end1));		// end2 is between start1 and end1
}