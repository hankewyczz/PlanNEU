/* Checks if any sections in an array overlap */
function anySectionsOverlap(sections: Section[]): boolean {
	for (let i = 0; i < sections.length - 1; i++) {
		for (let j = i + 1; j < sections.length; j++) {
			if (sectionsOverlap(sections[i], sections[j])) {
				return true;
			}
		}
	}
	return false;
}



/* Checks if two Sections overlap (time-based) */
function sectionsOverlap(s1: Section, s2: Section): boolean {
	let s1Times: Times = s1.getTimes();
	let s2Times: Times = s2.getTimes();

	for (let day1 of s1Times.days) {
		for (let day2 of s2Times.days) {
			// Check if this is the same day
			if (day1 == day2) {
				if (anyTimesOverlap(s1Times.content[day1], s2Times.content[day2])) {
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
function anyTimesOverlap(s1Times: Time[], s2Times: Time[]): boolean {
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
function timesOverlap(t1: Time, t2: Time): boolean {
	// Check for any type of possible overlap (if any of these are true, there is overlap)
	return ((t1.start >= t2.start && t1.start <= t2.end) 	// t1.start is between t2.start and t2.end
		|| (t1.end >= t2.start && t1.end <= t2.end)			// t1.end is between t2.start and t2.end
		|| (t2.start >= t1.start && t2.start <= t1.end) 	// t2.start is between t1.start and t1.end
		|| (t2.end >= t1.start && t2.end <= t1.end));		// t2.end is between t1.start and t1.end
}




/* 
Creates all possible combinations from an array of arrays 
https://stackoverflow.com/questions/8936610/how-can-i-create-every-combination-possible-for-the-contents-of-two-arrays
*/
function createCombinations(arrayOfArrays: Section[][], filter: Filter): Section[][] {
	// Empty case
	if (arrayOfArrays.length == 0) {
		return [];
	}

	// Empty case for any of the classes
	for (let i = 0; i < arrayOfArrays.length; i++) {
		if (arrayOfArrays[i].length == 0) {
			return [];
		}
	}

	// We create an empty array of the proper length
	let indices: number[] = new Array(arrayOfArrays.length);
	indices.fill(0);	// Fill with zeros

	let output: Section[][] = [];

	
	do {
		// Create and push a combination
		let result: Section[] = formCombination(indices, arrayOfArrays);
		// Check if the sections overlap
		if (anySectionsOverlap(result) || !filter.func(result)) {
			// If they overlap or don't meet the criteria, we break out of the for loop
			continue;
		}
		output.push(result);
	}
	while (odometerIncrement(indices, arrayOfArrays));

	return output;
}



// Take an array of indices, and generate the resulting combination 
function formCombination<K>(indices: number[], arrayOfArrays: K[][]): K[] {
	// Uses the indices array to create the resulting combination
	return arrayOfArrays.map((arr, index) => arr[indices[index]]);
}




// Incements the array of indices 
function odometerIncrement<K>(indices: number[], arrayOfArrays: K[][]): boolean {
	// We start with the rightmost index in indices
	for (let i = indices.length - 1; i >= 0; i--) {
		// Here, we check if we can increment without going over the max value
		if (indices[i] + 1 <= arrayOfArrays[i].length - 1) {
			indices[i]++;
			// If we can, we increment and return true
			return true;
		}
		// We can't increment without going over the max
		else {
			// We move one digit to the left (if we can)
			if (i - 1 < 0) {
				// Nothing more to increment -- we're done
				return false;
			}
			else {
				// Cycle this one to 0, and go again with the next one
				indices[i] = 0;
				continue;
			}
		}
	}
	return false;
}



/* Given an array of arrays of Sections, check how many possible combinations there are */
function howManyCombinations(arr: Section[][]): number {
	let total: number = 1;
	for (let i = 0; i < arr.length; i++) {
		total *= arr[i].length;
	}
	return total;
}