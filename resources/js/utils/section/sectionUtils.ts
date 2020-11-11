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





/* 
Creates all possible combinations from an array of arrays 
https://stackoverflow.com/questions/8936610/how-can-i-create-every-combination-possible-for-the-contents-of-two-arrays
*/
function createCombinations<K>(arrayOfArrays: K[][]): K[][] {
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

	let output: K[][] = [];

	
	// Create and push the first combination
	output.push(formCombination(indices, arrayOfArrays));

	while (odometerIncrement(indices, arrayOfArrays)) {
		// Create and push a combination
		output.push(formCombination(indices, arrayOfArrays));
	}

	return output;
}



// Take an array of indices, and generate the resulting combination 
function formCombination<K>(indices: number[], arrayOfArrays: K[][]): K[] {
	let output = [];

	// Iterate over the indices
	for (let i = 0; i < indices.length; i++) {
		output.push(arrayOfArrays[i][indices[i]]);
	}

	return output;
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