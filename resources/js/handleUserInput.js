////////////////////////////
//// DOCUMENT VARIABLES ////
////////////////////////////

var COURSES_DIV_ID = "course-right-col";
var SEMESTER_SELECTOR_ID = "semester-selector";


/*
Handles the user input
	- input (String): the user input for a single course
	- @return (Course): the course matching the user input
	- @throws if the input could not be parsed, or if the course has already been added
*/
async function handleUserInput(input, semester) {
	// First, we try parsing the input
	try {
		var course = parseInputCourse(input, semester);
	} catch (err) {
		throw new Error("No matching course");
	}

	if (alreadyAdded(course.name)) {
		throw new Error("Course already added");
	}

	return course;
}


/*
Handles getting a single course
	- course (Course): The course which we're querying from the API
	- @return (String): The full name of the course
	- @throws If the course could not be fetched, or if it could not be properly added
*/
async function handleGetCourse(course) {
	if (alreadyAdded(course)) {
		throw new Error("Course already added");
	}

	try {
		// Try getting the course
		await getCourseFromApi(course);
	} catch (err) {
		throw new Error("Couldn't get the course: " + err.message);
	}

	// Making sure we've gotten the course already
	if (!alreadyAdded(course)) {
		throw new Error("Course could not be added");
	}

	return courseName;
}


/*
This is the user-level handling for a single course, from input to end
	- input (String): user input representing a class
	- @return (void)
*/
async function handleSingleCourse(input) {
	try {
		var semester = document.getElementById(SEMESTER_SELECTOR_ID).value;

		// Handle the input and getting the course
		var course = await handleUserInput(input, semester);

		// Get the course, the course name, and the coreqs
		var fullCourseName = await handleGetCourse(course);
		var coreqStr = getCoreqs(course);

		// Add it to the UI 
		addToCourseDiv(course, fullCourseName);


	    var messageStr = "Successfully added " + fullCourseName + "! ";
	    // If we have any coreqs, we add them
	    messageStr += (coreqStr != null) ? coreqStr : "";

        // Send the message
        handleMessage(messageStr);
	}
    catch (err) {
        handleErr(err.message);
    }
}


/*
Adds the course to the user interface
	- course (Course): the course to add
	- fullCourseName (String): the full course name
	- @return (void) */
function addToCourseDiv(course, fullCourseName) {
	// Add it to the courses
	var courseEntry = document.createElement("span");
	courseEntry.innerHTML = fullCourseName;

	var remove = document.createElement("span");
	remove.onclick = function() { handleRemove(course.name, courseEntry) };
	remove.className = 'remove-course';
	remove.innerHTML ="  [X]<br>";

	courseEntry.appendChild(remove);
    document.getElementById(COURSES_DIV_ID).appendChild(courseEntry);
}



/*
Handle removing a course we added
	- subject (String): the subject of the course
	- courseId (String): the numerical ID of the course
	- @return (void)
*/
function handleRemove(subject, courseId, obj) {
	// Remove the course internally
	removeCourse(subject, courseId);
	document.getElementById(COURSES_DIV_ID).removeChild(obj);
	handleMessage("Removed class " + subject + courseId);
}