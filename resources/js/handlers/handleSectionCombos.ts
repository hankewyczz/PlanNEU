// For each course, we store an array of the course Sections
var sectionArrOfArr: Section[][];


/*
Grabs the courses and semester info from the URL */
function getCourseInfoFromUrl(): [string, string[]] {
	try {
		let url: URLSearchParams = new URLSearchParams(window.location.href);
		let semester: string = (url.get('semester') as string);
		let courseStr: string = (url.get('courses') as string);

		// If they're empty, we throw an error
		if (semester === "" || courseStr === "") {
			throw new Error();
		}

		let courses: string[] = courseStr.split(',').slice(0, 10);

		return [semester, courses];
	}
	catch (err) {
		throw new Error("URL parameters are empty - <a href='addCourses.html'>Go back to course selection</a>");
	}
	
}


/*
Saves the courses
*/
async function getCoursesFromUrl(): Promise<Section[][]> {
	let output: Section[][] = [];
	let semester: string;
	let courses: string[];

	[semester, courses] = getCourseInfoFromUrl();

	for (let i = 0; i < courses.length; i++) {
		// Handle the input and getting the course
		let course: Course = handleUserInput(courses[i], semester);
		await handleGetCourse(course);
		output.push(course.sections());
	}

	return output;
}


/* Handle fetching the course/sections from the URL and parsing */
async function prepareSections(): Promise<void> {
	try {
		handleMessage("Fetching course section data...");
		sectionArrOfArr = await getCoursesFromUrl();
		handleMessage("Fetched all section data");


		let combinations: number = howManyCombinations(sectionArrOfArr);
		let combinationStr: string = combinations.toLocaleString();

		const COMBO_WARNING: number = 100_000;	// If we have more than this amount of combinations, warn the user
		const COMBO_ERROR: number = 10_000_000;	// Ditto, but if it's over this number, throw an error

		if (combinations >= COMBO_ERROR) {
			handleMessage(`Over ${COMBO_ERROR.toLocaleString()} possible schedule combinations.
				Please remove some courses and try again.`, Message.Error);
		}
		else if (combinations >= COMBO_WARNING) {
			handleMessage(`Over ${COMBO_WARNING.toLocaleString()} possible schedule combinations`, Message.Warning);
		}
		else {
			handleMessage(`${combinationStr} possible schedule combinations`);
		}

		// Enable the submit button
		(document.getElementById("submit-filters") as HTMLButtonElement).disabled = false;
	}
	catch (err) {
		console.log(err);
		handleMessage(err.message, Message.Error);
	}
}



/* Handles the parsing and validation of the user information */
function handleFilterInputs(): Filter {
	let filter: Filter = new Filter();

	// Do we only want to show the open schedules?
	let onlyOpenStr: string = (document.querySelector('input[name="open-seats"]:checked') as HTMLInputElement).value;
	if (onlyOpenStr === 'true') {
		filter.add(isSeatsLeft);
	}

	// Get the start/end time values
	let startStr: string = (document.getElementById("start-time") as HTMLInputElement).value;
	let endStr: string = (document.getElementById("end-time") as HTMLInputElement).value;

	let start = startStr.split(':');
	let end = endStr.split(':');

	let startTime: number = (+start[0]) * 60 * 60 + (+start[1]) * 60;
	let endTime: number = (+end[0]) * 60 * 60 + (+end[1]) * 60;

	if (startTime > endTime) {
		throw new Error("Start time must be before the end time");
	}
	filter.add((s) => isValidTime(s, startTime, endTime));

	// Deal with days off
	let minDaysOffStr: string = (document.getElementById("min-days-off") as HTMLInputElement).value;
	let minDaysOff: number = parseInt(minDaysOffStr);
	if (minDaysOff < 0 || minDaysOff > 4) {
		throw new Error("Days off must be between 0 and 4");
	}

	// Get the specific days off
	let specificDaysOff: string[] = [];
	let checkboxes = (document.querySelectorAll('input[type=checkbox]:checked') as NodeListOf<HTMLInputElement>);

	for (var i = 0; i < checkboxes.length; i++) {
		specificDaysOff.push(checkboxes[i].value)
	}

	if (specificDaysOff.length > minDaysOff) {
		throw new Error(`Number of selected days (${specificDaysOff.length}) is greater than the number of days off (${minDaysOff})`);
	}
	filter.add(s => enoughDaysOff(s, minDaysOff, specificDaysOff));


	// Honors courses
	let honorsStr: string = (document.querySelector('input[name="honors-courses"]:checked') as HTMLInputElement).value;
	let honors: boolean = (honorsStr == 'true');

	let minHonorsStr: string = (document.getElementById("min-honors") as HTMLInputElement).value;
	let minHonors: number = parseInt(minHonorsStr);

	if (minHonors < 0) {
		throw new Error("Minimum honors courses must be non-negative");
	}
	else if (minHonors > 0) {
		honors = true;
	}

	if (honors) {
		filter.add(s => (anyHonors(s) && meetsMinHonorsReq(s, minHonors)));
	}
	else {
		// Return false if there are any honors courses
		filter.add(s => !anyHonors(s));
	}


	return filter;
}



// Generate the results
function handleGenerateScheduleAndFilter() {
	try {
		handleMessage("Generating all combinations...");
		let filter: Filter = handleFilterInputs();

		let combinations: Section[][] = createCombinations(sectionArrOfArr, filter);

		console.log(combinations);
		for (let i = 0; i < combinations.length; i++) {
			console.log(new Result(combinations[i]).toString());

		}
		
		handleMessage(`Generated ${combinations.length} results`, Message.Success);
	}
	catch (err) {
		console.log(err);
		handleMessage(err.message, Message.Error);
	}
}