"use strict";
// Keeps track of all the classes the user has added
var USER_COURSES = {};
//////////////////////////////////////////////////
////////    Dealing with USER_COURSES     ////////
//////////////////////////////////////////////////
/*
A single Course.
*/
class Course {
    // Constructor
    constructor(subject, courseId, semester) {
        this.subject = subject;
        this.courseId = courseId;
        this.semester = semester;
        this.name = subject + courseId;
        this.content = {};
    }
    addContent(content) {
        this.content = content["results"][0];
    }
    alreadySaved() {
        return alreadySaved(this.name);
    }
    sections() {
        let arrSec = this.content["sections"];
        let results = [];
        for (let i = 0; i < arrSec.length; i++) {
            let sec = new Section(arrSec[i]["crn"], this.name, arrSec[i]);
            saveSection(sec);
            results.push(sec);
        }
        return results;
    }
}
/*
Removes a course which has already been gotten
    - courseName (String): The name of the course (subject + courseId)
    - @return (void)
*/
function removeSavedCourse(courseName) {
    delete USER_COURSES[courseName];
}
/*
Gets the course data from a course which has already been added
    - courseName (String): The name of the course (subject + courseId)
    - @return (Dictionary): the results struct of this class (does not include filters)
    - @throws If the class has not been added yet
*/
function getSavedCourse(courseName) {
    try {
        return USER_COURSES[courseName];
    }
    catch (err) {
        throw new Error("Class has not yet been added");
    }
}
/*
Adds a new course and data to the dictionary
    - course (Course): The course which we're adding to the dictionary
    - body (Dictionary): the contents of the class
    - @return (void)
    - @throws if the stored value is not a dictionary, and doesn't contain "results"
*/
function saveCourse(course, body) {
    if (typeof body === "object" && !Array.isArray(body)) {
        if ('results' in body && body['results'].length > 0) {
            course.addContent(body);
            USER_COURSES[course.name] = course;
            return;
        }
    }
    throw new Error("Course content is not properly formatted (requires 'results' key)");
}
/*
Gets the full name of a course (which has already been gotten)
    - course (Course): The course we're getting the full name of
    - @return (String): the full name of the requested course
    - @throws If the class has not yet been added
*/
function getCourseName(course) {
    // We can't get the course name if we haven't added the course yet
    if (!course.alreadySaved()) {
        throw new Error("Class has not yet been added");
    }
    try {
        let courseName = course.content["class"]["name"];
        return `${course.name}: ${courseName}`;
    }
    catch (err) {
        console.log(err);
        // If we can't get the full name, just return the combined name
        return course.name;
    }
}
/*
Check if this course has already been added
    - @return (boolean) Whether this course has been added already or not
*/
function alreadySaved(courseName) {
    return courseName in USER_COURSES;
}
