/*
Handles the user input

input: the user input for a single course

returns an array containing the capitalized subject, and the course number (both as strings)
throws an error if the input could not be parsed, or if the course has already been added
*/

async function handleUserInput(input) {
	// First, we try parsing the input
	try {
		var parsedInput = parseInputCourse(input);
	} catch (err) {
		throw new Error("Couldn't find a course matching input '" + input + "'");
	}

	if (alreadyAdded(parsedInput[0], parsedInput[1])) {
		throw new Error("Course has already been added");
	}

	return parsedInput;
}


/*
Handles getting a single course

subject: the subject of the course
courseId: the numerical ID of a source
semester: the semester we're searching in 

returns: The full name of the course
throws an error if the course could not be fetched, or if it could not be properly added
*/
async function handleGetCourse(subject, courseId, semester) {
	try {
		await getCourseFromApi(subject, courseId, semester);
	} catch (err) {
		throw new Error("Couldn't fetch the course: " + err);
	}

	// Making sure we've gotten the course already
	if (!alreadyAdded(subject, courseId)) {
		throw new Error("Class could not be added");
	}

	var courseName = getCourseName(subject, courseId);
	console.log("Got course \"" + courseName + "\"");

	// TODO add the course to the courses field
}



async function handleSingleCourse(input, semester) {
	// Handle the input and getting the course
	try {
		var parsedInput = await handleUserInput(input);
		var subject = parsedInput[0];
		var courseId = parsedInput[1];

		// Get the course, and return the course name
		var courseName = await handleGetCourse(subject, courseId, semester);

		var coreqStr = getCoreqs(subject, courseId, semester);

		// TODO display the coreqs IF NOT NULL


	} catch(err) {
		// Display the error message to the user (right under the input box)
	}

	/* At this point, we've
		- Parsed the input
		- Gotten the course
		- Added it to the courses field
		- Handled the coreqs
	*/	


}