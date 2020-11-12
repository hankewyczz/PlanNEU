// Keeps track of all the classes the user has added
var USER_SECTIONS: { [key: string]: Section } = {};


//////////////////////////////////////////////////
////////    Dealing with USER_SECTIONS     ////////
//////////////////////////////////////////////////


/*
A single Section.
*/
class Section {
	// Class variables
	crn: string;
	courseName: string;
	content: { [key: string]: any };
	times: Times;
	// Constructor
	constructor(crn: string, courseName: string, content: {[key: string]: any}) {
		this.crn = crn;
		this.courseName = courseName;
		this.content = content;
		this.times = new Times(this.content["meetings"][0]["times"]);
	}
	alreadySaved(sectionCrn: string): boolean {
		return this.crn in USER_SECTIONS;
	}
	getTimes(): Times {
		return this.times;
	}
}


/*
Section times
*/
class Times {
	earliestStart: number = MAX_TIME;
	latestEnd: number = MIN_TIME;
	days: string[];
	content: { [key: string]: Time[] } = {};
	// Constructor
	constructor(times: { [key: string]: { [key: string]: number }[] }) {
		this.days = Object.keys(times);

		for (let i = 0; i < this.days.length; i++) {

			let output: Time[] = [];

			for (let j = 0; j < times[this.days[i]].length; j++) {
				let time: Time = new Time(times[this.days[i]][j]);
				output.push(time);

				// Update min and max times
				if (time.start < this.earliestStart) {
					this.earliestStart = time.start;
				}
				if (time.end > this.latestEnd) {
					this.latestEnd = time.end;
				}
			}
			
			// Add to the content object
			this.content[this.days[i]] = output;
		}
	}
}

/*
A single time range
*/
class Time {
	start: number;
	end: number;
	constructor(times: { [key: string]: number }) {
		this.start = times["start"];
		this.end = times["end"];
	}
}



/*
Removes a section which has already been gotten
	- sectionCrn (String): The CRN of the section
	- @return (void)
*/
function removeSavedSection(sectionCrn: string): void {
	delete USER_SECTIONS[sectionCrn];
}


/*
Gets the section data from a section which has already been added
	- sectionCrn (String): The CRN of the section
	- @return (Section): The section
	- @throws If the section has not been added yet
*/
function getSavedSection(sectionCrn: string): Section {
	try {
		return USER_SECTIONS[sectionCrn];
	}
	catch (err) {
		throw new Error("Class has not yet been added");
	}
}


/*
Adds a new Section
	- section (Section): The section which we're adding to the dictionary
	- @return (void)
*/
function saveSection(section: Section): void {
	USER_SECTIONS[section.crn] = section;
}