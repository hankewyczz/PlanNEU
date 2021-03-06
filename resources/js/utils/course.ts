///////////////////////
//// API Constants ////
///////////////////////


// NOTE: Ask them to add the Access-Control-Allow-Origin response header
// 		Otherwise, I can't GET right from this script, so we use a proxy
// 		https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
const BASE_API_URL: string = "https://api.searchneu.com/graphql";
const API_VERSION: string = "2";






//////////////////////////////////////////////////
////////    Dealing with USER_COURSES     ////////
//////////////////////////////////////////////////


/**
 * A single Course.
 */
class Course {
	// Basic info
	subject: string;
	courseId: string;
	semester: string;

	// Naming info
	name: string;
	fullName: string;

	// Course content
	content: Class | null;

	/**
	 * Constructs a Course instance.
	 * @param {string} subject  [The subject of the Course]
	 * @param {string} courseId [The ID of the Course]
	 * @param {string} semester [The semester of this Course]
	 */
	constructor(subject: string, courseId: string, semester: string) {
		// Basic course info
		this.subject = subject;
		this.courseId = courseId;
		this.semester = semester;

		// Name info
		this.name = subject + courseId;
		this.fullName = this.name 		// Initialize the full name to this for now

		// Initialize content as empty
		this.content = null;
	}

	/**
	 * Adds and parses Course content.
	 * @param {any} content [The content of this Course]
	 */
	addContent(content: any): void {
		// Save the content (and cast it)
		this.content = (content as Class);
		// Generate and save the full name
		this.fullName = `${this.name}: ${this.content["name"]}`;
	}

	// Check if this course has already been saved
	alreadySaved(): boolean {
		return alreadySaved(this.name);
	}

	/**
	 * Parses and returns all of the Sections of the Course
	 * @return {Section[]} [The Sections of this Course]
	 */
	sections(): Section[] {
		// We have to cast it 
		let content = (this.content as Class);
		// Map each section object into an actual Section instance.
		return content.sections.map((sec: SectionContent) => new Section(this, sec));
	}
}










//////////////////////////////////////////////
///// Keeping track of the saved courses /////
//////////////////////////////////////////////


// Keeps track of all the classes the user has added
let USER_COURSES: { [key: string]: Course } = {};


/**
 * Removes a Course which has already been saved.
 * @param {string} courseName [The name of the course (subject + courseId)]
 */
function removeSavedCourse(courseName: string): void {
	delete USER_COURSES[courseName];
}



/**
 * Gets the course data from a course which has already been saved
 * @param  {string} courseName [The name of the course (subject + courseId)]
 * @return {Course}            [The course]
 * @throws {Error} 			   [If the class has not been added yet]
*/
function getSavedCourse(courseName: string): Course {
	if (!(courseName in USER_COURSES)) {
		throw new Error("Cannot find saved Course: " + courseName);
	}
		
	return USER_COURSES[courseName];
}


/**
 * Adds a new course and data to the dictionary
 * @param {Course} course 	[The course which we're adding to the dictionary]
 * @param {any}  body   	[the contents of the class]
 * @throws {Error} 			[If the stored value is not a dictionary, and doesn't contain "results"]
 */
function saveCourse(course: Course, body: {[key: string]: any}): void {
	// We should've already checked the body for validity, but we do it again
	if ('type' in body && body['type'] == "ClassOccurrence") {
		course.addContent(body);
		USER_COURSES[course.name] = course;
		return;
	}
	throw new Error("Course content is not properly formatted")
}


/**
 * Check if this course has already been added
 * @param  {string}  courseName [The name of the Course]
 * @return {boolean}            [Whether this course has been added already or not]
 */
function alreadySaved(courseName: string): boolean {
	return courseName in USER_COURSES;
}










////////////////////////////
//// PARSING USER INPUT ////
////////////////////////////



/**
 * Parses user input representing a single class
 * @param  {string} inputStr [User input containing the subject and course number of a class (eg. "cs3500")]
 * @param  {string} semester [The semester of the Course]
 * @return {Course}          [The Course instance]
 * @throws {Error}			 [if the input is invalid or cannot be parsed]
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


/**
 * Checks if the given string is a valid number
 * @param  {string}  inputNum [the input number]
 * @return {boolean}          [Whether the input is a valid number or not]
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


/**
 * Sets up the query URL to get a single class
 * @param  {Course} course [The course we're querying]
 * @return {string}        [The query URL]
 */
function getQueryUrl(course: Course): string {
	/**
	 * Creates a structured URL query value 
	 * @param  {string} name  [The name of the query]
	 * @param  {string} value [The value of the query]
	 * @return {string}       [The formatted query]
	 */
	function addQuery(name: string, value: string): string {
		return `&${name}=${value}`;
	}

	// Setup the base query URL
	let queryURL = `${BASE_API_URL}${course.semester}/search?`;

	//search?apiVersion=2&classIdRange=min-1000_max-2000&filters=%7B"subject"%3A%5B"CS"%5D%2C"classIdRange"%3A%7B"min"%3A3800%2C"max"%3A3800%7D%7D&maxIndex=1&minIndex=0&subject=CS

	queryURL += addQuery("apiVersion", API_VERSION);	// Set the API version
	queryURL += addQuery("termId", course.semester);	// Specify which semester we're searching in
	queryURL += addQuery("minIndex", "0");				// We only want one result
	queryURL += addQuery("maxIndex", "1");				// Only get results from 0-1 (get the first one)
	queryURL += addQuery("classIdRange", `min-${course.courseId}_max-${course.courseId}`);
	queryURL += addQuery("subject", course.subject);


	return queryURL;
}


/**
 * Fetches the data for a single course
 * @param  {Course}        course [The course we"re querying]
 * @return {Promise<void>}        [the course body request as a Promise]
 * @throws {Error}				  [if the response was unexpected or improperly formatted]
 */
async function getCourseFromApi(course: Course): Promise<void> {

	const data = JSON.stringify({
		query: `query searchResults($termId: Int!, $query: String, $offset: Int = 0, $first: Int = 10, $subject: [String!], $nupath: [String!], $campus: [String!], $classType: [String!], $classIdRange: IntRange) {
  search(
    termId: $termId
    query: $query
    offset: $offset
    first: $first
    subject: $subject
    nupath: $nupath
    campus: $campus
    classType: $classType
    classIdRange: $classIdRange
  ) {
    totalCount
    pageInfo {
      hasNextPage
    }
    filterOptions {
      nupath {
        value
        count
        description
      }
      subject {
        value
        count
        description
      }
      classType {
        value
        count
        description
      }
      campus {
        value
        count
        description
      }
    }
    nodes {
      type: __typename
      ... on Employee {
        bigPictureUrl
        emails
        firstName
        googleScholarId
        lastName
        link
        name
        officeRoom
        personalSite
        phone
        primaryDepartment
        primaryRole
        streetAddress
      }
      ... on ClassOccurrence {
        name
        subject
        classId
        termId
        host
        desc
        nupath
        prereqs
        coreqs
        prereqsFor
        optPrereqsFor
        maxCredits
        minCredits
        classAttributes
        url
        lastUpdateTime
        sections {
          campus
          classId
          classType
          crn
          honors
          host
          lastUpdateTime
          meetings
          profs
          seatsCapacity
          seatsRemaining
          subject
          termId
          url
          waitCapacity
          waitRemaining
        }
      }
    }
  }
}
`,
		variables: `{
			"termId": ${course.semester},
			"query": "",
			"offset": 0,
			"subject": [
				"${course.subject}"
			],
			"classIdRange": {
				"min": ${course.courseId},
				"max": ${course.courseId}
			}
		}`
	});



	const response = await fetch(BASE_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: data
	}).then(r => r.json())
	

	let courseResult;
	try {
		courseResult = response['data']['search']['nodes'];
	}
	catch(err) {
		throw new Error("Invalid response from API");
	}
	
	try {
		courseResult = courseResult[0];
	}
	catch (err) {
		throw new Error("No matching course found");
	}

	// If we get here, we just save the course
	saveCourse(course, courseResult);
}



/**
 * Gets the corequisites of a course (which has already been gotten)
 * @param  {Course} course [The course we're querying]
 * @return {string}        [A list of hyperlinked coreqs]
 * @throws {Error}		   [if the course has not been added yet]
 */
function getCoreqs(course: Course): string {
	// To run this, the course needs to have been already added
	if (!course.alreadySaved()) {
		throw new Error("Course has not been added yet");
	}

	// Gets the coreqs of this course
	const coreqs = (course.content as Class)["coreqs"];


	/**
	 * Creates a link which will add this class when clicked
	 * @param  {string} name [The name of this Course]
	 * @return {string}      [A hyperlinked class, which, when clicked, will add this class]
	 */
	function addCourseLink(name: string): string {
		const onclick = `onclick="handleSingleCourse('${name}', '${course.semester}')"`;
		return `<a href="#" ${onclick}>${name}</a>`;
	}


	/**
	 * Generates our corequisite case recursively
	 * @param  {any[]}  values [The list of coreq values]
	 * @param  {string} type   [The type of values (OR, AND)]
	 * @return {string}        [A list of hyperlinked classes]
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


	/**
	 * Converts a coreq value to a string
	 * @param  {any}    value 	A 'value' can be one of a typed group (a group with a type), 
	 *                          or a single Course
	 * @return {string}       	[A list of hyperlinked classes]
	 */
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