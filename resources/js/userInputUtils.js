// Keeps track of all the classes the user has added
var USER_COURSES = {};

// API Constants
// TODO: Ask them to add the Access-Control-Allow-Origin response header
// Otherwise, I can't GET right from this script, so we use a proxy
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
var PROXY_URL = "https://cors-anywhere.herokuapp.com/";
var BASE_API_URL = PROXY_URL + "https://searchneu.com/search?"; 
var API_VERSION = 2;


/*
Parses user input representing a single class

	- input (String): User input containing the subject and course number of a class (eg. "cs3500", "CS 3500", etc)

	- return (Array): An array of the subject (String, capitalized), and the course number (String)
		eg. ["CS", "3500"]
*/
function parseInputCourse(input) {
	// Remove all whitespace (\s) globally (g), for both single and groups of whitespace (+)
	var input = input.replace(/\s+/g, '');

	// Sanity check - the class must be at least 5 long (subject + 4 digit number)
	if (input.length < 5) {
		throw new Error("A course must be at least 5 characters long");
	}

	// Get the subject and course number (Course number is always 4 digits)
	var subject = input.slice(0, -4);
	var courseId = input.slice(-4);

	// Capitalize the subject to standardize
	subject = subject.toUpperCase();
	// Check if the subject is valid
	// From start (^) to end ($) check if any characters are NOT A-Z
	if (!/^[A-Z]+$/.test(subject)) {
		throw new Error("Subject can only contain English letters (A-Z)");
	}

	// We convert the courseId to a number, just to check that it is a valid number
	var courseIdNum = Number(courseId);
	// Check if the courseId is not a number, or if it's not in range [0, 9999] (inclusive)
	if (isNaN(courseIdNum) || (courseIdNum > 9999 || courseIdNum < 0)) {
		throw new Error("Invalid course number");
	}

	/* This isn't enough - for example, Number accepts '0x11' or 'null' as a valid number (equal to 17 and 0)
	However, that can't be a course number! We have to check each individual digit (x is not a valid digit) */
	for (var i = 0; i < courseId.length; i++) {
		var num = new Number(courseId.slice(i, i + 1));
		if (isNaN(num)) {
			throw new Error("Invalid course number");
		}
	}


	return [subject, courseId];
}



/*
Checks if the user has already added this course.

subject: subject of a course
courseId: the numerical id of a course

returns: a boolean indicating if we've seen this course before
*/
function alreadyAdded(subject, courseId) {
	return (subject + courseId) in USER_COURSES;
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


/*
Fetches the data for a single course

subject: the subject of the course
courseId: the numerical ID of a source
semester: the semester we're searching in 

returns: a Promise
*/
async function getCourseFromApi(subject, courseId, semester) {
	queryURL = getQueryUrl(subject, courseId, semester);
	return fetch(queryURL).then(
		response => response.json().then(
			function(response) {
				// Check if the response is a dictionary
				if (typeof response === "object" && !Array.isArray(response)) {
					if ('results' in response && response['results'].length > 0) {
						USER_COURSES[(subject + courseId)] = response;
					}
					else {
						throw new Error("No matching course found");
					}
				}
				else {
					throw new Error("Invalid response from API");
				}
			})
		);
}


/*
Gets the course data from a course which has already been added

subject: the course subject
courseId: the courseID of the course (as a string)

return: the results struct of this class (does not include filters)

*/
function getCourse(subject, courseId) {
	if (!alreadyAdded(subject, courseId)) {
		throw new Error("Class has not yet been added");
	}

	return USER_COURSES[subject + courseId]["results"][0];
}



/*
Gets the full name of a course (which has already been gotten)

subject: the course subject
courseId: the courseID of the course (as a string)

return: the full name of the requested course
*/
function getCourseName(subject, courseId) {
	if (!alreadyAdded(subject, courseId)) {
		throw new Error("Class has not yet been added");
	}
	var combinedName = subject + courseId;
	try {		
		return combinedName + ": " + getCourse(subject, courseId)["class"]["name"];
	}
	catch (err) {
		return combinedName;
	}
}



/*
Gets the corequisites of a course (which has already been gotten)

subject: the course subject
courseId: the courseID of the course (as a string)
semester: the semester we're searching in 

return: A string representing a list of hyperlinked coreqs OR null, if no coreqs available
*/
function getCoreqs(subject, courseId, semester) {
	var combinedName = subject + courseId;

	// TO run this, the course needs to have been already added
	if (!alreadyAdded(subject, courseId)) {
		throw new Error("Course has not been added yet");
	}

	// Gets the coreqs of this course
	var coreqs = getCourse(subject, courseId)["class"]["coreqs"];


	// Creates a link which will add this class when clicked
	// Example: <a href="#" onclick="handleGetCourse('CS', '3001', '202130')">CS3001</a>
	function addCourseLink(subject, courseId) {
		var link = "<a href=\"#\"";
		link += "onclick=\"handleGetCourse('" + subject + "', '" + courseId + "', '" + semester + "')\">";
		link += subject + courseId + "</a>";
		return link;
	}

	
	// Generates our corequisite case
	// Handles two types: "or" and "and"
	// Very handy for recursive generation (which we do come across)
	function coreqCase(values, type) {
		var outputStr = "";
		// We store the results in an array first to check how many coreqs we have
		var outputArr = [];
		// Loop over all the values
		for (var i = 0; i < values.length; i++) {
			var strVal = valueToStr(values[i]);
			if (strVal != null) {
				outputArr.push(strVal);
			}
		}

		// If we have more than one coreq...
		if (outputArr.length > 1) {
			outputStr += "(";
			// Loop thru all the coreqs
			for (i = 0; i < outputArr.length; i++) {
				// eg: "CS3500 and "
				outputStr += outputArr[i] + " " + type + " ";
			}
			// Trim the trailing text
			var lastWord = type.length + 2;	// Length of the type, plus 2 spaces
			outputStr = outputStr.slice(0, -lastWord);
			// Close the parentheses
			outputStr += ") ";
		}
		else if (outputArr.length == 1) {
			outputStr = outputArr[0] + " ";
		}
		else {
			// The values array was empty
			return null;
		}
		return outputStr;
	}


	// Converts a coreq value to a string
	// A 'value' can be one of:
	// 	- A typed group (eg. a group of classes which MUST be taken [and], or a group of classes of which ONE must
	//		be taken [or])
	//  - A single class
	function valueToStr(value) {
		console.log(value);
		// Check if the value is a single course
		if ("subject" in value) {
			var subject = value["subject"];
			var courseId = value["classId"];

			// If the user has already added this coreq, there's no need for us to inform them of it
			if (!alreadyAdded(subject, courseId)) {
				// If the coreq is missing, the user can't add it, so we don't show them it
				if (!("missing" in value) || value["missing"] == false) {
					return addCourseLink(subject, courseId, semester);
				}				
			}
			// If either of those fails, we return an empty string (we check for this)
			return null;
		}

		// Dealing with a typed group
		else if ("type" in value) {
			// Check which type this group is
			switch (value["type"]) {
				case "or":
					// Run coreqCase with the "or" case
					return coreqCase(value["values"], "or");
				case "and":
					// Ditto, but with "and"
					return coreqCase(value["values"], "and");
			}
		}
		// Neither a course nor a typed group - we don't know what it is
		throw new Error("Invalid value coreq value: " + value);
	}

	var coStr = valueToStr(coreqs);
	return coStr === null ? null : "Corequisite courses (click to add): " + coStr;
}



/*
Removes a course which has already been gotten

subject: the course subject
courseId: the courseID of the course (as a string)

returns nothing
*/
function removeCourse(subject, courseId) {
	USER_COURSES.remove(subject + courseId);
	// Return nothing
}