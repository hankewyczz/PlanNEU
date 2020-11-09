// Keeps track of all the classes the user has added
const USER_COURSES: { [key: string]: Course } = {};


//////////////////////////////////////////////////
////////    Dealing with USER_COURSES     ////////
//////////////////////////////////////////////////


/*
A single Course.
*/

class Course {
	// Class variables
	subject: string;
	courseId: string;
	semester: string;
	name: string;
	content: { [key: string]: any };
	// Constructor
	constructor(subject: string, courseId: string, semester: string) {
		this.subject = subject;
		this.courseId = courseId;
		this.semester = semester;
		this.name = subject + courseId;
		this.content = {};
	}
	addContent(content: object): void {
		this.content = content;
	}
}


/*
Removes a course which has already been gotten
	- courseName (String): The name of the course (subject + courseId)
	- @return (void)
*/
function removeCourse(courseName: string): void {
	delete USER_COURSES[courseName];
}


/*
Gets the course data from a course which has already been added
	- courseName (String): The name of the course (subject + courseId)
	- @return (Dictionary): the results struct of this class (does not include filters)
	- @throws If the class has not been added yet
*/
function getCourse(courseName: string): object {
	if (!alreadyAdded(courseName)) {
		throw new Error("Class has not yet been added");
	}

	let courseContent = USER_COURSES[courseName].content;
	return courseContent["results"][0];
}


/*
Adds a new course and data to the dictionary
	- course (Course): The course which we're adding to the dictionary
	- body (Dictionary): the contents of the class
	- @return (void)
	- @throws if the stored value is not a dictionary, and doesn't contain "results"
*/
function addCourse(course: Course, body: {[key: string]: any}): void {
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
Checks if the user has already added this course.
	- courseName (String): The name of the course (subject + courseId)
	- @return (boolean): boolean indicating if we have already gotten this course
*/
function alreadyAdded(courseName: string): boolean {
	return courseName in USER_COURSES;
}


/*
Gets the full name of a course (which has already been gotten)
	- course (Course): The course we're getting the full name of
	- @return (String): the full name of the requested course
	- @throws If the class has not yet been added
*/
function getCourseName(course: Course): string {
	// We can't get the course name if we haven't added the course yet
	if (!alreadyAdded(course.name)) {
		throw new Error("Class has not yet been added");
	}

	try {
		let courseName: string = (getCourse(course.name) as any)["class"]["name"];
		return `${course.name}: ${courseName}`;
	}
	catch (err) {
		console.log(err);
		// If we can't get the full name, just return the combined name
		return course.name;
	}
}