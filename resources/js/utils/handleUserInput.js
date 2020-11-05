var COURSES_DIV = document.getElementById("course-right-col");


/*
Handles the user input
	- input (String): the user input for a single course
	- @return (Array): The capitalized subject, and the course number (both as strings)
	- @throws if the input could not be parsed, or if the course has already been added
*/
async function handleUserInput(input) {
	// First, we try parsing the input
	try {
		var parsedInput = parseInputCourse(input);
	} catch (err) {
		throw new Error("No matching course");
	}

	if (alreadyAdded(parsedInput[0], parsedInput[1])) {
		throw new Error("Course already added");
	}

	return parsedInput;
}


/*
Handles getting a single course
	- subject (String): the subject of the course
	- courseId (String): the numerical ID of the course
	- semester (String): the semester we're searching in
	- @return (String): The full name of the course
	- @throws If the course could not be fetched, or if it could not be properly added
*/
async function handleGetCourse(subject, courseId, semester) {
	if (alreadyAdded(subject, courseId)) {
		throw new Error("Course already added");
	}

	try {
		// Try getting the course
		await getCourseFromApi(subject, courseId, semester);
	} catch (err) {
		throw new Error("Couldn't get the course: " + err.message);
	}

	// Making sure we've gotten the course already
	if (!alreadyAdded(subject, courseId)) {
		throw new Error("Course could not be added");
	}

	var courseName = getCourseName(subject, courseId);
	console.log("Got course \"" + courseName + "\"");

	return courseName;
}


/*
This is the user-level handling for a single course, from input to end
	- input (String): user input representing a class
	- @return (void)
*/
async function handleSingleCourse(input) {
	try {
		// Get the semester 
		var semester = document.getElementById("semester-selector").value;
		// Handle the input and getting the course
		var parsedInput = await handleUserInput(input);
		var subject = parsedInput[0];
		var courseId = parsedInput[1];

		// Get the course, and return the course name
		var courseName = await handleGetCourse(subject, courseId, semester);

		var coreqStr = getCoreqs(subject, courseId, semester);
		var output = [courseName, coreqStr];

		
		var simpleName = subject + courseId;

		// Add it to the courses
		var courseEntry = "<span id='" + simpleName + "'>" + output[0];
		courseEntry += " <span onclick='handleRemove(\"" + subject + "\", \"" + courseId + "\")' class='remove-course'>";
		courseEntry += "[X]</span><br></span>"
	    COURSES_DIV.innerHTML += courseEntry;

	    var messageStr = "Successfully added course! "

	    if (coreqStr != null) {
            messageStr += coreqStr;
        }

        // Send the message
        handleMessage(messageStr);
	}
    catch (err) {
        handleErr(err.message);
    }
}



/*
Handle removing a course we added
	- subject (String): the subject of the course
	- courseId (String): the numerical ID of the course
	- @return (void)
*/
function handleRemove(subject, courseId) {
	// Remove the course internally
	removeCourse(subject, courseId);
	var elemToRemove = document.getElementById(subject + courseId);
	COURSES_DIV.removeChild(elemToRemove);
}