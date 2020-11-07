//////////////////////////////////////
////////    API Constants     ////////
//////////////////////////////////////

// NOTE: Ask them to add the Access-Control-Allow-Origin response header
// 		Otherwise, I can't GET right from this script, so we use a proxy
// 		https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
var PROXY_URL = "https://cors-anywhere.herokuapp.com/";
var BASE_API_URL = PROXY_URL + "https://searchneu.com/search?"; 
var API_VERSION = 2;



////////////////////
//// USER INPUT ////
////////////////////


/*
Parses user input representing a single class
	- input (String): User input containing the subject and course number of a class (eg. "cs3500", "CS 3500", etc)
	- semester (String): The semester of this course
	- @return (Course): A new Course instance
	- @throws if the input is invalid or cannot be parsed
*/
function parseCourseInput(input, semester) {
	// Remove all whitespace (\s) globally (g), for both single and groups of whitespace (+)
	var input = input.replace(/\s+/g, '');

	// Sanity check - the class must be at least 5 long (subject + 4 digit number)
	if (input.length < 5) {
		throw new Error("Course name must be at least 5 characters long");
	}

	// Get the subject and course number (Course number is always 4 digits)
	var subject = input.slice(0, -4).toUpperCase();
	var courseId = input.slice(-4);

	// Check if the subject is valid
	// From start (^) to end ($) check if any characters are NOT A-Z
	if (!/^[A-Z]+$/.test(subject)) {
		throw new Error("Subject can only contain English letters (A-Z)");
	}
	if (!isValidNum(courseId)) {
		throw new Error("Invalid course number");
	}

	return new Course(subject, courseId, semester);
}


/* Checks if the given string is a valid number
	- inputNum (String): the input number
	- @return (boolean): Whether the input is a valid number or not
	*/
function isValidNum(inputNum) {
	/* We check to make sure the 4-character string is a number. We do this one by one, because Number accepts some
	unexpected strings as valid numbers (eg.'0x11' == 17 or 'null' == 7, which of course, can't be course numbers!)
	So, we check each individual digit */
	for (var i = 0; i < inputNum.length; i++) {
		var num = new Number(inputNum.slice(i, i + 1));
		if (isNaN(num)) {
			return false;
		}
	}
	return true;
}




////////////////////////
//// COURSE QUERIES ////
////////////////////////



/*
Sets up the query URL to get a single class
	- course (Course): The course we're querying
	- @return (String): The query URL
*/
function getQueryUrl(course) {
	/* Returns a structured query
		- name (String): the name of the query
		- value (String): the value of the query
		- @return (String): a structured URL query */
	function addQuery(name, value) {
		return "&" + name + "=" + value;
	}

	// Setup the base query URL
	var queryURL = BASE_API_URL;
	
	queryURL += addQuery("query", "");	// Add a blank search query
	queryURL += addQuery("termId", course.semester);	// Specify which semester we're searching in
	queryURL += addQuery("minIndex", "0");	// We only want one result
	queryURL += addQuery("maxIndex", "1");	// Only get results from 0-1 (get the first one)
	queryURL += addQuery("apiVersion", API_VERSION);	// Set the API version

	// Create the filters
	var subjectFilter = "'subject':['" + course.subject + "'],";
	var classIdFilter = "'classIdRange':{'min':" + course.courseId + ",'max':" + course.courseId + "}";
	var filters = "{" + subjectFilter + classIdFilter + "}";

	// We encode the filters to be URL safe
	filters = encodeURIComponent(filters);
	queryURL += addQuery("filters", filters);	// Add the filters to the URL

	return queryURL;
}


/*
Fetches the data for a single course
	- course (Course): The course we're querying
	- @return (Promise): the course body request as a Promise (resolves to response when done)
	- @throws if the response was unexpected or improperly formatted
*/
async function getCourseFromApi(course) {
	return fetch(getQueryUrl(course)).then(response => response.json().then(function(response) {
				// Check if the response is a dictionary (it should be)
				if (typeof response === "object" && !Array.isArray(response)) {
					// Check if we have any hits for our search
					if ('results' in response && response['results'].length > 0) {
						// If we do, then we add this course to the USER_COURSES
						addCourse(course, response);
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
	- course (Course): The course we're querying
	- @return (String or null): A list of hyperlinked coreqs OR null, if no coreqs available
	- @throws if the course has not been added yet
*/
function getCoreqs(course) {
	// To run this, the course needs to have been already added
	if (!alreadyAdded(course.name)) {
		throw new Error("Course has not been added yet");
	}

	// Gets the coreqs of this course
	var coreqs = getCourse(course.name)["class"]["coreqs"];


	/*
	Creates a link which will add this class when clicked
		- @return (String): A hyperlinked class, which, when clicked, will add this class
	Example: <a href="#" onclick="handleSingleCourse('CS3000', '202130')">CS3001</a>
	*/
	function addCourseLink(name) {
		var onclick = "onclick=\"handleSingleCourse('" + name + "', '" + course.semester + "')\"";
		var link = "<a href=\"#\" " + onclick + ">" + name + "</a>";
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
			outputStr += ") ";
		}
		// If we only have one, we don't need to add the word
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
			var name = value["subject"] + value["classId"];

			// If the user has already added this coreq, there's no need for us to inform them of it
			if (!alreadyAdded(name)) {
				// If the coreq is missing, the user can't add it, so we don't show them it
				if (!("missing" in value) || value["missing"] == false) {
					return addCourseLink(name);
				}				
			}
			return null;	// The class is missing - the user can't add it, so we don't show them
		}

		// Dealing with a typed group
		else if ("type" in value) {
			return coreqCase(value["values"], value["type"]);
		}
		// Neither a course nor a typed group - we don't know what it is
		throw new Error("Invalid value coreq value: " + value);
	}

	var coStr = valueToStr(coreqs);
	return coStr === null ? null : "Corequisite courses (click to add): " + coStr;
}