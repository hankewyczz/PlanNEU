/* Checks if two Sections overlap (time-based) */
function sectionsOverlap(s1: Section, s2: Section): boolean {
	let s1Times = s1.content["meetings"]["times"];
	let s2Times = s2.content["meetings"]["times"];

	let s1Days: string[] = Object.keys(s1Times);
	let s2Days: string[] = Object.keys(s2Times);

	for (let i = 0; i < s1Days.length; i++) {
		for (let j = 0; j < s2Days.length; j++) {
			// Same day
			let day1: string = s1Days[i];
			let day2: string = s2Days[j];
			if (day1 == day2) {
				let start1 = s1Times[day1]["start"];
				let end1 = s1Times[day1]["end"];
				let start2 = s2Times[day2]["start"];
				let end2 = s2Times[day2]["start"];

				// Check for any type of possible overlap
				if ((start1 >= start2 && start1 <= end2) || (end1 >= start2 && end1 <= end2)
					|| (start2 >= start1 && start2 <= end1) || (end2 >= start1 && end2 <= end1)) {
					return false;
				}


			}
		}
	}
	// If we get here, it's false
	return false;
}