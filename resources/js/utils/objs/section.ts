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

		// Initialize as null, so we know if it's been set or not
		let meetingTimes = null;

		// All class meetings (lecture/exams/etc)
		let meetings = content["meetings"];

		for (let i = 0; i < meetings.length; i++) {
			if (meetings[i]["type"] == "Class") {
				meetingTimes = new Times(meetings[i]["times"]);
			}
		}
		if (meetingTimes == null) {
			throw new Error("No meeting times found");
		}

		this.times = meetingTimes;
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