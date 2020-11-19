//////////////////////////////////////
////////    API Constants     ////////
//////////////////////////////////////

// NOTE: Ask them to add the Access-Control-Allow-Origin response header
// 		Otherwise, I can't GET right from this script, so we use a proxy
// 		https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
const PROXY_URL: string = "https://cors-anywhere.herokuapp.com/";
const BASE_API_URL: string = PROXY_URL + "https://searchneu.com/search?";
const API_VERSION: string = "2";








//////////////////////////////////////////////////
////////    Dealing with USER_COURSES     ////////
//////////////////////////////////////////////////


// A single Course.
class Course {
	// Basic info
	subject: string;
	courseId: string;
	semester: string;

	// Naming info
	name: string;
	fullName: string;

	// Course content
	content: { [key: string]: any };

	// Constructor
	constructor(subject: string, courseId: string, semester: string) {
		// Basic course info
		this.subject = subject;
		this.courseId = courseId;
		this.semester = semester;

		// Name info
		this.name = subject + courseId;
		this.fullName = this.name 		// Initialize the full name to this for now

		// Initialize content as empty
		this.content = {};
	}

	// Add and parse content
	addContent(content: any): void {
		// Save the content
		this.content = content["results"][0];
		// Generate and save the full name
		this.fullName = `${this.name}: ${this.content["class"]["name"]}`;
	}

	// Check if this course has already been saved
	alreadySaved(): boolean {
		return alreadySaved(this.name);
	}

	// Parse this course's sections
	sections(): any[] {
		let results: Section[] = [];

		for (const section of this.content["sections"]) {
			results.push(new Section(this, section));
		}
		return results;
	}
}









//////////////////////////////////////////////
///// Keeping track of the saved courses /////
//////////////////////////////////////////////


// Keeps track of all the classes the user has added
let USER_COURSES: { [key: string]: Course } = {};


/* Removes a course which has already been saved 
	- courseName (String): The name of the course (subject + courseId) */
function removeSavedCourse(courseName: string): void {
	delete USER_COURSES[courseName];
}


/* Gets the course data from a course which has already been saved
	- courseName (String): The name of the course (subject + courseId)
	- @return (Course): The course
	- @throws If the class has not been added yet
*/
function getSavedCourse(courseName: string): Course {
	if (!(courseName in USER_COURSES)) {
		throw new Error("Cannot find saved Course: " + courseName);
	}
		
	return USER_COURSES[courseName];
}


/*
Adds a new course and data to the dictionary
	- course (Course): The course which we're adding to the dictionary
	- body (Dictionary): the contents of the class
	- @throws if the stored value is not a dictionary, and doesn't contain "results"
*/
function saveCourse(course: Course, body: {[key: string]: any}): void {
	// We should've already checked the body for validity, but we do it again
	if (typeof body === "object" && !Array.isArray(body)) {
		if ('results' in body && body['results'].length > 0) {
			course.addContent(body);
			USER_COURSES[course.name] = course;
			return;
		}
	}
	throw new Error("Course content is not properly formatted (requires 'results' key)")
}


/*
Check if this course has already been added
	- @return (boolean) Whether this course has been added already or not
*/
function alreadySaved(courseName: string): boolean {
	return courseName in USER_COURSES;
}










////////////////////////////
//// PARSING USER INPUT ////
////////////////////////////


/* Parses user input representing a single class
	- input (String): User input containing the subject and course number of a class (eg. "cs3500", "CS 3500", etc)
	- semester (String): The semester of this course
	- @return (Course): A new Course instance
	- @throws if the input is invalid or cannot be parsed
*/
function parseCourseInput(inputStr: string, semester: string): Course {
	// Remove all whitespace (\s) globally (g), for both single and groups of whitespace (+)
	const input: string = inputStr.replace(/\s+/g, '');

	// Sanity check - the class must be at least 5 long (subject + 4 digit number)
	if (input.length < 5) {
		throw new Error("Course name must be at least 5 characters long");
	}

	// Get the subject and course number (Course number is always 4 digits)
	const subject: string = input.slice(0, -4).toUpperCase();
	const courseId: string = input.slice(-4);

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
function isValidNum(inputNum: string): boolean {
	/* We check to make sure the 4-character string is a number. We do this one by one, because Number accepts some
	unexpected strings as valid numbers (eg.'0x11' == 17 or 'null' == 7, which of course, can't be course numbers!) */
	for (const char of inputNum) {
		// Check if each one is a valid num
		if (Number.isNaN(Number(char))) {
			return false;
		}
	}
	return true;
}










////////////////////////
//// COURSE QUERIES ////
////////////////////////



/* Sets up the query URL to get a single class
	- course (Course): The course we're querying
	- @return (String): The query URL
*/
function getQueryUrl(course: Course): string {
	// Creates a structured URL query value
	function addQuery(name: string, value: string): string {
		return `&${name}=${value}`;
	}

	// Setup the base query URL
	let queryURL = BASE_API_URL;

	queryURL += addQuery("query", "");					// Add a blank search query
	queryURL += addQuery("termId", course.semester);	// Specify which semester we're searching in
	queryURL += addQuery("minIndex", "0");				// We only want one result
	queryURL += addQuery("maxIndex", "1");				// Only get results from 0-1 (get the first one)
	queryURL += addQuery("apiVersion", API_VERSION);	// Set the API version

	// Create the filters
	const subjectFilter = `"subject":["${course.subject}"]`;
	const classIdFilter = `"classIdRange":{"min":${course.courseId},"max":${course.courseId}}`;
	let filters = `{${subjectFilter},${classIdFilter}}`;

	// We encode the filters to be URL safe
	filters = encodeURIComponent(filters);
	queryURL += addQuery("filters", filters);	// Add the filters to the URL

	return queryURL;
}


/* Fetches the data for a single course
	- course (Course): The course we"re querying
	- @return (Promise): the course body request as a Promise (resolves to response when done)
	- @throws if the response was unexpected or improperly formatted
*/
async function getCourseFromApi(course: Course): Promise<void> {
	const response = await fetch(getQueryUrl(course))
		.then(response => response.json())
		// Error doesn't propagate, so we force it
		.catch(() => { throw new Error("Could not access the courses API") });
		

	// Check if the response is a dictionary (it should be)
	if (typeof response !== "object" || !('results' in response)) {
		throw new Error("Invalid response from API");
	}
		
	// Check if anything came up for our search
	if (response['results'].length == 0) {
		throw new Error("No matching course found");
	}
	
	// If we get here, we just save the course
	saveCourse(course, response);
}


/*
Gets the corequisites of a course (which has already been gotten)
	- course (Course): The course we're querying
	- @return (String or null): A list of hyperlinked coreqs
	- @throws if the course has not been added yet
*/
function getCoreqs(course: Course): string {
	// To run this, the course needs to have been already added
	if (!course.alreadySaved()) {
		throw new Error("Course has not been added yet");
	}

	// Gets the coreqs of this course
	const coreqs = course.content["class"]["coreqs"];


	/*
	Creates a link which will add this class when clicked
		- @return (String): A hyperlinked class, which, when clicked, will add this class
	*/
	function addCourseLink(name: string): string {
		const onclick = `onclick="handleSingleCourse('${name}', '${course.semester}')"`;
		return `<a href="#" ${onclick}>${name}</a>`;
	}


	/*
	Generates our corequisite case recursively
	Handles two types: "or" and "and"
		- @return (String): A list of hyperlinked classes
	*/
	function coreqCase(values: any[], type: string): string | null {		
		// Map each value to a string first
		const mappedVals: (string | null)[] = values.map((v) => valueToStr(v));
		// Filter out all of the null values
		const outputArr: string[] = mappedVals.filter((v): v is string => v !== null);


		// If we have more than one coreq...
		if (outputArr.length > 1) {
			// Join the array for the type: eg. "ONE and TWO and THREE"
			const valuesStr = outputArr.join(` ${type} `);
			// Wrap in parentheses
			return `(${valuesStr}) `;
		}
		// If we only have one, we don't need to add the word
		else if (outputArr.length == 1) {
			return `${outputArr[0]} `; // Single case
		}

		// The values array was empty
		return null; 
	}


	// Converts a coreq value to a string
	// A 'value' can be one of:
	// 	- A typed group (a group of classes, where either ALL classes must be taken, or ONE must be taken)
	//  - A single class
	// 	- @return (String or null): A list of hyperlinked classes
	function valueToStr(value: any): string | null {
		// Check if the value is a single course
		if ("subject" in value) {
			const name = value["subject"] + value["classId"];

			// If the user has already added this coreq, there's no need for us to inform them of it
			// Also, if the coreq is missing, the user can't add it, so we don't show them it
			if (!alreadySaved(name) && !value.missing) {
				return addCourseLink(name);
			}
		}

		// Dealing with a typed group
		else if ("type" in value) {
			return coreqCase(value["values"], value["type"]);
		}
		
		// Not a valid course/group, so we just return null
		return null;
	}


	const coStr = valueToStr(coreqs);
	return coStr === null ? "" : `Corequisite courses (click to add): ${coStr.trim()}`;
}