"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
////////////////////////////
//// DOCUMENT VARIABLES ////
////////////////////////////
const MESSAGE_DIV_ID = "message-div";
const COURSES_DIV_ID = "side-course-col";
const SEMESTER_SELECTOR_ID = "semester-selector";
const USER_INPUT_ID = "user-course-input";
/*
Handles the user input
    - input (String): the user input for a single course
    - @return (Course): the course matching the user input
    - @throws if the input could not be parsed, or if the course has already been added
*/
function handleUserInput(input, semester) {
    // First, we try parsing the input
    let course;
    try {
        course = parseCourseInput(input, semester);
    }
    catch (err) {
        throw new Error("No matching course");
    }
    if (course.alreadySaved()) {
        throw new Error("Course already added");
    }
    return course;
}
/*
Handles getting a single course
    - course (Course): The course which we're querying from the API
    - @return (String): The full name of the course
    - @throws If the course could not be fetched, or if it could not be properly added
*/
function handleGetCourse(course) {
    return __awaiter(this, void 0, void 0, function* () {
        if (course.alreadySaved()) {
            throw new Error("Course already added");
        }
        try {
            // Try getting the course
            yield getCourseFromApi(course);
        }
        catch (err) {
            throw new Error("Couldn't get the course: " + err.message);
        }
        // Making sure we've gotten the course already
        if (!course.alreadySaved()) {
            throw new Error("Course could not be added");
        }
        return getCourseName(course);
    });
}
/*
This is the user-level handling for a single course, from input to end
    - We can either take input, or stick to defaults
    - The defaults get the user input and user semester (from the UI)
    - We only override in the case of coreq courses
    - @return (void)
*/
function handleSingleCourse(input = document.getElementById(USER_INPUT_ID).value, semester = document.getElementById(SEMESTER_SELECTOR_ID).value) {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById(USER_INPUT_ID).value = ""; // Reset the input value
        try {
            // Handle the input and getting the course
            let course = yield handleUserInput(input, semester);
            // Get the course, the course name, and the coreqs
            let fullCourseName = yield handleGetCourse(course);
            let coreqStr = getCoreqs(course);
            // Add it to the UI 
            addToCourseDiv(course, fullCourseName);
            let messageStr = `Successfully added ${fullCourseName}! ${coreqStr}`;
            // Send the message
            handleMessage(messageStr);
        }
        catch (err) {
            handleErr(err.message);
        }
    });
}
/*
Adds the course to the user interface
    - course (Course): the course to add
    - fullCourseName (String): the full course name
    - @return (void) */
function addToCourseDiv(course, fullCourseName) {
    // Add it to the courses
    let courseEntry = document.createElement("span");
    courseEntry.innerHTML = fullCourseName;
    let remove = document.createElement("span");
    remove.onclick = function () { handleRemove(course.name, courseEntry); };
    remove.className = 'remove-course';
    remove.innerHTML = "  [X]<br>";
    courseEntry.appendChild(remove);
    document.getElementById(COURSES_DIV_ID).appendChild(courseEntry);
}
/*
Handle removing a course we added
    - name (String): the course to remove
    - obj (Object): the parent object of the span
    - @return (void)
*/
function handleRemove(name, obj) {
    // Remove the course internally
    removeSavedCourse(name);
    document.getElementById(COURSES_DIV_ID).removeChild(obj);
    handleMessage(`Removed class ${name}`);
}
/*
Validates user input, and fetches the corresponding class
    - obj (Object): The input field which called this
    - event (KeyEvent): the keyEvent
    - @return (void)
*/
function validateInput(event) {
    return __awaiter(this, void 0, void 0, function* () {
        if (event.keyCode === 13) {
            event.preventDefault();
            yield handleSingleCourse();
        }
    });
}
/*
Displays an error message
    - message (String) the message to display
    - @return (void)
*/
function handleErr(message) {
    handleMessage(message, true);
}
/*
Displays an informational (ie. non-error) message
    - message (String) the message to display
    - @return (void)
*/
function handleMessage(message, error = false) {
    let messageDiv = document.getElementById(MESSAGE_DIV_ID);
    // The color is different depending on whether it's an error or not
    messageDiv.style.backgroundColor = error ? '#f66' : '#9d9';
    messageDiv.innerHTML = message;
    messageDiv.style.visibility = "visible";
}
/*
Toggles the visibility of the instructions
    - @return (void)
*/
function toggleInstructions() {
    let instructions = document.getElementById("instructions");
    let arrow = document.getElementById("arrow");
    if (instructions.style.display === "none") {
        instructions.style.display = "block";
        arrow.innerHTML = "&#9660";
    }
    else {
        instructions.style.display = "none";
        arrow.innerHTML = "&#9654";
    }
}
