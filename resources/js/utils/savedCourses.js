// Keeps track of all the classes the user has added
var USER_COURSES = {};


//////////////////////////////////////////////////
////////    Dealing with USER_COURSES     ////////
//////////////////////////////////////////////////


/*
Removes a course which has already been gotten
	- subject (String): the subject of the course
	- courseId (String): the numerical ID of the course
	- @return (void)
*/
function removeCourse(subject, courseId) {
	delete USER_COURSES[(subject + courseId)];
}


/*
Gets the course data from a course which has already been added
	- subject (String): the subject of the course
	- courseId (String): the numerical ID of the course
	- @return (Dictionary): the results struct of this class (does not include filters)
	- @throws If the class has not been added yet
*/
function getCourse(subject, courseId) {
	if (!alreadyAdded(subject, courseId)) {
		throw new Error("Class has not yet been added");
	}

	return USER_COURSES[subject + courseId]["results"][0];
}


/*
Adds a new course and data to the dictionary
	- subject (String): the subject of the course
	- courseId (String): the numerical ID of the course
	- body (Dictionary): the contents of the class
	- @return (void)
	- @throws if the stored value is not a dictionary, and doesn't contain "results"
*/
function addCourse(subject, courseId, body) {
	if (typeof body === "object" && !Array.isArray(body)) {
		if ('results' in body && body['results'].length > 0) {
			USER_COURSES[(subject + courseId)] = body;
			return;
		}
	}
	throw new Error("Course content is not properly formatted (requires 'results' key)")	
}



/*
Checks if the user has already added this course.
	- subject (String): the subject of the course
	- courseId (String): the numerical ID of the course
	- @return (boolean): boolean indicating if we have already gotten this course
*/
function alreadyAdded(subject, courseId) {
	return (subject + courseId) in USER_COURSES;
}


/*
Gets the full name of a course (which has already been gotten)
	- subject (String): the subject of the course
	- courseId (String): the numerical ID of the course
	- @return (String): the full name of the requested course
	- @throws If the class has not yet been added
*/
function getCourseName(subject, courseId) {
	// We can't get the course name if we haven't added the course yet
	if (!alreadyAdded(subject, courseId)) {
		throw new Error("Class has not yet been added");
	}

	// Generate the combined name
	var combinedName = subject + courseId;
	try {		
		return combinedName + ": " + getCourse(subject, courseId)["class"]["name"];
	}
	catch (err) {
		// If we can't get the full name, just return the combined name
		return combinedName;
	}
}