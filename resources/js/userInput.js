/* Keeps track of all the classes the user has already added 
Useful for making sure we never end up in a co-requisite loop */
var userCourses = {};


// API Constants
var BASE_API_URL = "https://searchneu.com/search?";
var API_VERSION = 2;


/*
Parses the user input which specifies a single class (eg. "cs3500", "CS 3500", "cs  3500")

input: A string representing the subject (eg. "CS", "HIST") and the course number (eg. "2211", "3500")

returns: an array containing the capitalized subject, and the course number (both as strings)
	eg. ["CS", "3500"]
*/
function parseInputCourse(input) {
	// Remove all whitespace (\s) globally (g), for both single and groups of whitespace (+)
	var input = input.replace(/\s+/g, '');
	// Sanity check - the class must be at least 5 long (subject + 4 digit number)
	if (input.length < 5) {
		throw new Error("Invalid input - a course must be at least 5 characters long");
	}


	// Get the subject and course number (Course number is always 4 digits)
	var subject = input.slice(0, -4);
	// Capitalize the subject to standardize
	subject = subject.toUpperCase();
	// Check if the subject is valid
	// From start (^) to end ($) check if any characters are NOT A-Z
	if (!/^[A-Z]+$/.test(subject)) {
		throw new Error("Invalid input - subject must only contain English letters");
	}

	var courseId = input.slice(-4);


	var courseIdNum = Number(courseId);
	if (isNaN(courseIdNum) || (courseIdNum > 9999 || courseIdNum < 0)) {
		throw new Error("Invalid input - course number cannot be calculated");
	}
	
	return [subject, courseId];
}


/*
Checks if the user has already added this course.

subject: subject of a course
courseId: the numberical id of a course

returns: a boolean indicating if we've seen this course before
*/
function alreadyAdded(subject, courseId) {
	return (subject + courseId) in userCourses;
}




function getCourse(subject, courseId, semester) {
	queryURL = getQueryUrl(subject, courseId, semester);
}



/*
Sets up the query URL to get a single class

subject: the course subject
courseId: the courseID of the course (as a string)
semester: the semester we're searching in (as a string)

return: the query URL
*/
function getQueryUrl(subject, courseId, semester) {
	/*
	Returns a structured query

	name: the name of the query
	value: the value of the query

	Returns a structured URL query
	*/
	function addQuery(name, value) {
		return "&" + name + "=" + value;
	}

	// Setup the base query URL
	var queryURL = BASE_API_URL;
	// Add a blank search query
	queryURL += addQuery("query", "");
	// Specify which semester we're searching in
	queryURL += addQuery("termId", semester);
	// We want only 1 result, so we change the min/max index
	queryURL += addQuery("minIndex", "0");
	queryURL += addQuery("maxIndex", "1");
	// Set the API version we're using
	queryURL += addQuery("apiVersion", API_VERSION);

	// Create the filters
	// Create the subject filter
	var filters = "{\"subject\":[\"" + subject + "\"],";
	// Then, we add the classIdRange filter (we only want our specific class ID)
	filters += "\"classIdRange\":{\"min\":" + courseId + ",\"max\":" + courseId + "}}";
	// We encode the filters to be URL safe
	filters = encodeURIComponent(filters);

	// Add the filters to the URL
	queryURL += addQuery("filters", filters);

	return queryURL;
}