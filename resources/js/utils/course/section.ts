//A single Section.
class Section {
	// Class variables
	crn: string;
	courseName: string;
	fullCourseName: string;

	content: { [key: string]: any };
	times: Times;
	// Constructor
	constructor(crn: string, courseName: string, fullCourseName: string, content: {[key: string]: any}) {
		// Initialize
		this.crn = crn;
		this.courseName = courseName;
		this.fullCourseName = fullCourseName;
		this.content = content;

		// Get only the class meetings
		let meetings = content["meetings"].filter((obj: any) => obj.type === "Class");

		if (meetings.length > 0) {
			this.times = new Times(meetings[0]["times"]);
		}
		else {
			throw new Error("No meeting times found");
		}
	}

	// Gets all meeting times
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
				this.earliestStart = (time.start < this.earliestStart) ? time.start : this.earliestStart;
				this.latestEnd = (time.end > this.latestEnd) ? time.end : this.latestEnd;
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