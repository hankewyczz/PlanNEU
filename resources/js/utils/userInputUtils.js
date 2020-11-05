// Keeps track of all the classes the user has added
var USER_COURSES = {};


//////////////////////////////////////
////////    API Constants     ////////
//////////////////////////////////////

// TODO: Ask them to add the Access-Control-Allow-Origin response header
// 		Otherwise, I can't GET right from this script, so we use a proxy
// 		https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
var PROXY_URL = "https://cors-anywhere.herokuapp.com/";
var BASE_API_URL = PROXY_URL + "https://searchneu.com/search?"; 
var API_VERSION = 2;


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





///////////////
//// Other ////
///////////////

/*
Parses user input representing a single class
	- input (String): User input containing the subject and course number of a class (eg. "cs3500", "CS 3500", etc)
	- @return (Array): An array of the subject (String, capitalized), and the course number (String)
		eg. ["CS", "3500"]
	- @throws if the input is invalid or cannot be parsed
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
Sets up the query URL to get a single class
	- subject (String): the subject of the course
	- courseId (String): the numerical ID of the course
	- semester (String): the semester we're searching in
	- @return (String): The query URL
*/
function getQueryUrl(subject, courseId, semester) {
	/*
	Returns a structured query
		- name (String): the name of the query
		- value (String): the value of the query
		- @return (String): a structured URL query
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

	// Create the filters, starting with the subject filter
	var filters = "{\"subject\":[\"" + subject + "\"],";
	// Then, we add the classIdRange filter (so we only get the one class ID)
	filters += "\"classIdRange\":{\"min\":" + courseId + ",\"max\":" + courseId + "}}";
	// We encode the filters to be URL safe
	filters = encodeURIComponent(filters);
	// Add the filters to the URL
	queryURL += addQuery("filters", filters);

	return queryURL;
}


/*
Fetches the data for a single course
	- subject (String): the subject of the course
	- courseId (String): the numerical ID of the course
	- semester (String): the semester we're searching in
	- @return (Promise): the course body request as a Promise (resolves to response when done)
	- @throws if the response was unexpected or improperly formatted
*/
async function getCourseFromApi(subject, courseId, semester) {
	queryURL = getQueryUrl(subject, courseId, semester);

	return fetch(queryURL).then(response => response.json().then(
			function(response) {
				// Check if the response is a dictionary (it should be)
				if (typeof response === "object" && !Array.isArray(response)) {
					// Check if we have any hits for our search
					if ('results' in response && response['results'].length > 0) {
						// If we do, then we add this course to the USER_COURSES
						addCourse(subject, courseId, response);
					}
					else {
						// Nothing came up for our search
						throw new Error("No matching course found");
					}
				}
				// The API gave us something unexpected
				else {
					throw new Error("Invalid response from API");
				}
			}));
}


/*
Gets the corequisites of a course (which has already been gotten)
	- subject (String): the subject of the course
	- courseId (String): the numerical ID of the course
	- semester (String): the semester we're searching in
	- @return (String or null): A list of hyperlinked coreqs OR null, if no coreqs available
	- @throws if the course has not been added yet
*/
function getCoreqs(subject, courseId, semester) {
	var combinedName = subject + courseId;

	// To run this, the course needs to have been already added
	if (!alreadyAdded(subject, courseId)) {
		throw new Error("Course has not been added yet");
	}

	// Gets the coreqs of this course
	var coreqs = getCourse(subject, courseId)["class"]["coreqs"];


	/*
	Creates a link which will add this class when clicked
		- @return (String): A hyperlinked class, which, when clicked, will add this class
	Example: <a href="#" onclick="handleSingleCourse('CS3000', '202130')">CS3001</a>
	*/
	function addCourseLink(subject, courseId) {
		var link = "<a href=\"#\"";
		link += "onclick=\"handleSingleCourse('" + subject + courseId + "', '" + semester + "')\">";
		link += subject + courseId + "</a>";
		return link;
	}

	
	/*
	Generates our corequisite case recursively
	Handles two types: "or" and "and"
		- @return (String): A list of hyperlinked classes
	*/
	function coreqCase(values, type) {
		var outputStr = "";
		// We store the results in an array first to check how many coreqs we have
		var outputArr = [];
		// Loop over all the values
		for (var i = 0; i < values.length; i++) {
			var strVal = valueToStr(values[i]);
			// Only add if it's non-null
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
			outputStr = outputArr[0] + " "; // Single case
		}
		else {
			return null; // The values array was empty
		}
		return outputStr;
	}


	// Converts a coreq value to a string
	// A 'value' can be one of:
	// 	- A typed group (eg. a group of classes which MUST be taken [and], or a group of classes of which ONE must
	//		be taken [or])
	//  - A single class
	// 	- @return (String or null): A list of hyperlinked classes
	function valueToStr(value) {
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
			return null;	// The class is missing - the user can't add it, so we don't show them
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