// Keeps track of all the classes the user has added
var USER_COURSES: { [key: string]: Course } = {};


//////////////////////////////////////////////////
////////    Dealing with USER_COURSES     ////////
//////////////////////////////////////////////////


// A single Course.
class Course {
	// Name info
	subject: string;
	courseId: string;
	semester: string;
	name: string;
	fullName: string;

	content: { [key: string]: any } = {};

	// Constructor
	constructor(subject: string, courseId: string, semester: string) {
		this.subject = subject;
		this.courseId = courseId;
		this.semester = semester;
		this.name = subject + courseId;

		// Initialize the full name to this for now
		this.fullName = this.name 
	}

	// Add and parse content
	addContent(content: any): void {
		// Save the content
		this.content = content["results"][0];
		this.fullName = `${this.name}: ${this.content["class"]["name"]}`;
	}

	// Check if this course has already been saved
	alreadySaved(): boolean {
		return alreadySaved(this.name);
	}

	// Parse this course's sections
	sections(): any[] {
		let arrSec: any[] = this.content["sections"];
		let results: Section[] = [];

		for (let i = 0; i < arrSec.length; i++) {
			let sec = new Section(arrSec[i]["crn"], this.name, this.fullName, arrSec[i]);
			saveSection(sec);
			results.push(sec);
		}
		return results;
	}
}



/* Removes a course which has already been gotten
	- courseName (String): The name of the course (subject + courseId)
	- @return (void)
*/
function removeSavedCourse(courseName: string): void {
	delete USER_COURSES[courseName];
}


/* Gets the course data from a course which has already been added
	- courseName (String): The name of the course (subject + courseId)
	- @return (Dictionary): the results struct of this class (does not include filters)
	- @throws If the class has not been added yet
*/
function getSavedCourse(courseName: string): Course {
	if (!(courseName in USER_COURSES)) {
		throw new Error("Class has not yet been added");
	}
		
	return USER_COURSES[courseName];
}


/*
Adds a new course and data to the dictionary
	- course (Course): The course which we're adding to the dictionary
	- body (Dictionary): the contents of the class
	- @return (void)
	- @throws if the stored value is not a dictionary, and doesn't contain "results"
*/
function saveCourse(course: Course, body: {[key: string]: any}): void {
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