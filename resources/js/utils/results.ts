/**
 * The Result of a schedule combination.
 */
class Result {
	// Class variables
	sections: Section[];
	days: { [key: string]: { [key: number]: string } };

	// Attributes
	honorsCount: number = 0;
	earliestStart: number = MAX_TIME;
	latestEnd: number = MIN_TIME;
	minSeatsLeft: number = 100_000;	// Initialize with a large number - here's hoping there's no 100,000 seat classes
	areDaysFree: { [key: string]: boolean } = { "1": true, "2": true, "3": true, "4": true, "5": true };
	daysOff: number = 0;



	/**
	 * Creates a Result instance.
	 * @param {Section[]} sections The list of Sections in this combination.
	 */
	constructor(sections: Section[]) {
		this.sections = sections;
		this.days = {"1": {}, "2": {}, "3": {}, "4": {}, "5": {}};


		for (let sec of sections) {
			this.honorsCount += (sec.content.honors) ? 1 : 0;
			this.earliestStart = Math.min(sec.times.earliestStart, this.earliestStart);
			this.latestEnd = Math.max(sec.times.latestEnd, this.latestEnd);
			this.minSeatsLeft = Math.min(sec.content["seatsRemaining"], this.minSeatsLeft);


			// Deal with the schedule
			const times: Times = sec.times;

			// For each day
			for (const day of times.days) {
				// This day is no longer free
				this.areDaysFree[day] = false;
				// Handle each meeting
				for (const meetTime of times.content[day]) {
					this.days[day][meetTime.start] = this.timeStr(meetTime, sec);
				}
			}
		}

		// Count how many days off we have total
		this.daysOff = Object.keys(this.areDaysFree).filter((day) => this.areDaysFree[day]).length;
	}

	/**
	 * Converts a Time into a string.
	 * @param  {Time}    time    The Time to convert
	 * @param  {Section} section The Section from which this Time is.
	 * @return {string}          The time string.
	 */
	timeStr(time: Time, section: Section): string {
		return `${secsToHM(time.start)} - ${secsToHM(time.end)} | ${section.fullName}`;
	}


	/**
	 * Converts a Result into a string.
	 * @return {string} The string representation of this Result
	 */
	toString(): string {
		let out: string = "";

		for (let sec of this.sections) {
			out += sec.courseLink();
		}

		out += "<hr>";
		out += this.daysToString();
		return out;
	}


	/**
	 * Converts the meetings of a Result into a day by day schedule.
	 * @return {string} The resulting weekly schedule.
	 */
	daysToString(): string {
		let out = "";

		const strDays: { [key: string]: string } = {
			"1": "Monday", "2": "Tuesday",
			"3": "Wednesday", "4": "Thursday", "5": "Friday"
		};


		for (let day of Object.keys(this.days)) {
			// Check if we have anything this day
			if (Object.keys(this.days[day]).length == 0) {
				continue; // Empty day
			}

			out += `<b>${strDays[day]}</b>`;
			out += "<ul>";

			let dayMeetings: { [key: string]: string } = this.days[day];
			let meetings: string[] = Object.keys(dayMeetings);

			meetings.sort();

			for (let meeting of meetings) {
				out += `<li>${dayMeetings[meeting]}</li>`;
			}

			out += "</ul>"
		}	
		
		return out;
	}
}


/* Converts seconds to HH:MM string */
function secsToHM(seconds: number) {
	let date = new Date(seconds * 1000);
	// We want 12 hour time
	const hours = parseInt(date.toISOString().substr(11, 2)) % 12;
	return `${hours.toString().padStart(2, "0")}:${date.toISOString().substr(14, 2)}`;
}