////////////////////////////
//// DOCUMENT VARIABLES ////
////////////////////////////
const MESSAGE_DIV_ID: string = "message-div";
const COURSES_DIV_ID: string = "side-course-col";
const SEMESTER_SELECTOR_ID: string = "semester-selector";
const USER_INPUT_ID: string = "user-course-input";
const MAX_COURSES_ALLOWED: number = 8;
const COURSE_DIV_KIDS: number = 2;


/**
 * Handles the user input 	
 * @param  {string} input    the user input for a single course
 * @param  {string} semester The semester of the course
 * @return {Course}          the course matching the user input
 */
function handleUserInput(input: string, semester: string): Course {
	// First, we try parsing the input
	let course: Course  = parseCourseInput(input, semester);

	if (course.alreadySaved()) {
		throw new Error("Course already added");
	}

	return course;
}


/*
	- course (Course): The course which we're querying from the API
	- @return (String): The full name of the course
	- @throws If the course could not be fetched, or if it could not be properly added
*/

/**
 * Handles getting a single course
 * @param  {Course}          course The Course we're querying from the API
 * @return {Promise<void>}
 */
async function handleGetCourse(course: Course): Promise<void> {
	if (course.alreadySaved()) {
		throw new Error("Course already added");
	}

	try {
		// Try getting the course
		await getCourseFromApi(course);
	} catch (err) {
		throw new Error("Couldn't get the course: " + err.message);
	}

	// Making sure we've gotten the course already
	if (!course.alreadySaved()) {
		throw new Error("Course could not be added");
	}
}



/**
 * This is the user-level handling for a single course
 * @param  {string = (document.getElementById(USER_INPUT_ID) as HTMLInputElement).value} 	input    User course input
 * @param  {string = (document.getElementById(SEMESTER_SELECTOR_ID) as HTMLInputElement).value} semester The semester
 * @return {Promise<void>}
 */
async function handleSingleCourse(
	input: string = (document.getElementById(USER_INPUT_ID) as HTMLInputElement).value,
	semester: string = (document.getElementById(SEMESTER_SELECTOR_ID) as HTMLInputElement).value): Promise<void> {

	
	try {
		// Let the user know we're getting the course
		handleMessage("Fetching course...");

		// Reset the input value
		(document.getElementById(USER_INPUT_ID) as HTMLInputElement).value = ""; 

		// Check how many courses have already been added (all children, minus the initial ones)
		let coursesAdded = (document.getElementById(COURSES_DIV_ID) as HTMLElement).children.length - COURSE_DIV_KIDS;

		if (coursesAdded >= MAX_COURSES_ALLOWED) {
			throw new Error("Max number of courses reached");
		}

		// Handle the input and getting the course
		let course: Course = await handleUserInput(input, semester);
		// Get the course, the course name, and the coreqs
		await handleGetCourse(course);

		// Add it to the UI 
		addToCourseDiv(course, course.fullName);

		// Send a success message
		handleMessage(`Successfully added ${course.fullName}! ${getCoreqs(course)}`, Message.Success);
	}
	catch (err) {
		console.log(err);
		handleMessage(err.message, Message.Error);
	}
}


/**
 * Adds the course to the user interface
 * @param {Course} course         the course to add
 * @param {string} fullCourseName the full course name
 */
function addToCourseDiv(course: Course, fullCourseName: string): void {
	// Add it to the courses
	let courseEntry = document.createElement("span");
	courseEntry.innerHTML = fullCourseName;

	let remove = document.createElement("span");
	remove.onclick = function() { handleRemove(course.name, courseEntry) };
	remove.className = 'remove-course';
	remove.innerHTML = "  [X]<br>";

	courseEntry.appendChild(remove);
	(document.getElementById(COURSES_DIV_ID) as any).appendChild(courseEntry);
}



/**
 * Handle removing a course we added
 * @param {string} name the course to remove
 * @param {Node}   obj  the parent object of the span
 */
function handleRemove(name: string, obj: Node): void {
	// Remove the course internally
	removeSavedCourse(name);
	(document.getElementById(COURSES_DIV_ID) as any).removeChild(obj);
	handleMessage(`Removed class ${name}`);
}




/**
 * Validates user input keyEvents, and fetches the corresponding class
 * @param  {any}           event The input field which called this
 * @return {Promise<void>}     
 */
async function validateInput(event: any): Promise<void> {
	if (event.keyCode === 13) {
		event.preventDefault();
		await handleSingleCourse();
	}
}



/* Types of a message */
enum Message {
	Basic = "#ddd",
	Success = "#9d9",
	Warning = "#fd1",
	Error = "#f66"
}


/**
 * Displayes a message
 * @param {string}     message The message to display
 * @param {Message = Message.Basic} type The message type
 */
function handleMessage(message: string, type: Message = Message.Basic): void {
	console.log(message);
	let messageDiv: HTMLElement = document.getElementById(MESSAGE_DIV_ID) as HTMLElement;
	// Is this an info message, an error message, or a success message?
	messageDiv.style.backgroundColor = type;
	messageDiv.innerHTML = message;
	messageDiv.style.visibility = "visible";
}


/**
 * Toggles the visibility of the instructions.
 */
function toggleInstructions(): void {
	let instructions: HTMLElement = (document.getElementById("instructions") as HTMLElement);
	let arrow: HTMLElement = (document.getElementById("arrow") as HTMLElement);
	if (instructions.style.display === "none") {
		instructions.style.display = "block";
		arrow.innerHTML = "&#9660";
	} else {
		instructions.style.display = "none";
		arrow.innerHTML = "&#9654";
	}
}


/**
 * Prepares and sets the values of the form for the GET request.
 */
function setValues() {
	let semester = (document.getElementById(SEMESTER_SELECTOR_ID) as HTMLInputElement).value;
	let courses = Object.keys(USER_COURSES);

	(document.getElementById("submit-input-semester") as HTMLInputElement).value = semester;
	(document.getElementById("submit-input-courses") as HTMLInputElement).value = courses.join();
}