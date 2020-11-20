/**
 * The expected Section content.
 */
interface SectionContent {
	classType: string;
	crn: string;
	honors: boolean;
	meetings: IMeeting[];
	online: boolean;
	profs: string[];
	seatsCapacity: number;
	seatsRemaining: number;
	url: string;
	waitCapacity: number;
	waitRemaining: number;
	termId: string;
	host: string;
	subject: string;
	classId: string;
}



/**
 * A single Section.
 */
class Section {
	// Class variables
	crn: string;
	subject: string;
	courseId: string;
	name: string;
	fullName: string;

	content: { [key: string]: any };
	times: Times;

	/**
	 * Creates a Section instance.
	 * @param {Course} course  The parent Course (the Course of which type this Section is)
	 * @param {[key: string]: any}  content The content of this Section.
	 */
	constructor(course: Course, content: SectionContent) {
		// Initialize
		this.content = content;

		// Details
		this.crn = this.content.crn;
		this.subject = course.subject;
		this.courseId = course.courseId;
		this.name = course.name;
		this.fullName = course.fullName;
		

		// Get only the class meetings
		const meetings = content.meetings.filter((obj: any) => obj.type === "Class");

		if (meetings.length > 0) {
			this.times = new Times(meetings[0]["times"]);
		}
		else {
			throw new Error("No meeting times found");
		}
	}

	/**
	 * Creates a link to a Section.
	 * @return {string}          The course link.
	 */
	courseLink(): string {
		let out: string = `<a href="${this.content["url"]}">${this.crn}</a>`
		out += `: ${this.content.subject} ${this.content.classId}`;

		// The online status of this Section
		out += (this.content["online"]) ? " (Online)<br>" : "<br>";
		return out;
	}
}










/////////////////////////////////
////    Section Utilities    ////
/////////////////////////////////

/**
 * Checks if any sections in an array overlap
 * @param  {Section[]} sections The array of sections
 * @return {boolean}            A boolean indicating if any Sections overlap
 */	
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
	const s1Times: Times = s1.times;
	const s2Times: Times = s2.times;

	for (const day1 of s1Times.days) {
		for (const day2 of s2Times.days) {
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



/**
 * Checks if any number of time ranges overlap
 * @param  {Time[]}  s1Times The first list of Time
 * @param  {Time[]}  s2Times The second list of Time
 * @return {boolean}         A boolean indicating if any time overlaps 
 */
function anyTimesOverlap(s1Times: Time[], s2Times: Time[]): boolean {
	for (const time1 of s1Times) {
		for (const time2 of s2Times) {
			if (timesOverlap(time1, time2)) {
				return true;
			}
		}
	}
	// If we get here, there are no overlaps
	return false;
}


/**
 * Checks if two time ranges overlap
 * @param  {Time}    t1 The first Time
 * @param  {Time}    t2 The second Time
 * @return {boolean}    A boolean indicating if the two Time instances overlap
 */
function timesOverlap(t1: Time, t2: Time): boolean {
	// Check for any type of possible overlap (if any of these are true, there is overlap)
	return ((t1.start >= t2.start && t1.start <= t2.end) 	// t1.start is between t2.start and t2.end
		|| (t1.end >= t2.start && t1.end <= t2.end)			// t1.end is between t2.start and t2.end
		|| (t2.start >= t1.start && t2.start <= t1.end) 	// t2.start is between t1.start and t1.end
		|| (t2.end >= t1.start && t2.end <= t1.end));		// t2.end is between t1.start and t1.end
}




/**
 * Creates all possible combinations from an array of arrays
 * From stackoverflow.com/questions/8936610/how-can-i-create-every-combination-possible-for-the-contents-of-two-arrays
 * @param  {Section[][]} arrayOfArrays The array of Section arrays
 * @param  {Filter}      filter        The filter to apply
 * @return {Section[][]}                 The resulting Section[] combination possibilities
 */
function createCombinations(arrayOfArrays: Section[][], filter: Filter): Section[][] {
	// Check if the main array is empty, and check if there are any empty inner arrays
	if (arrayOfArrays.length == 0 || arrayOfArrays.filter((s) => s.length === 0).length > 0) {
		return [];
	}

	
	let results: Section[][] = [];

	/**
	 * Recursive inner function to create combinations.
	 * @param {number    = 0}  arrayIndex The index of the inner array we're on
	 * @param {Section[] = []} output     THe output array
	 */
	function combination(arrayIndex: number = 0, output: Section[] = []) {

		// Iterate over every Section, in this inner array
		for (let sec of arrayOfArrays[arrayIndex]) {

			// Clone the output, so we're not referring to the same array
			let cloneOut = output.slice();
			// Push this section to the output
			cloneOut.push(sec);

			if (arrayIndex == arrayOfArrays.length - 1) {
				// We're at the end of a combination -- add it to the results array
				// Only add if the sections don't overlap, and they pass the filter
				if (!anySectionsOverlap(cloneOut) && filter.func(cloneOut)) {
					results.push(cloneOut);
				}
				
			} else {
				// Otherwise, we increment the index and keep going
				combination(arrayIndex + 1, cloneOut);
			}
		}
	}

	// Create the combinations
	combination();

	// Return the combinations
	return results;
}


/* Given an array of arrays of Sections, check how many possible combinations there are */
function howManyCombinations(arr: Section[][]): number {
	// First, we map to get an array of the lengths of the inner arrays
	// Then, we find (and return) the product of all the lengths
	return arr.map((a) => a.length).reduce((a, b) => a * b, 1);
}