"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
Grabs the courses and semester info from the URL */
function getCourseInfoFromUrl() {
    try {
        let url = new URLSearchParams(window.location.href);
        let semester = url.get('semester');
        let courseStr = url.get('courses');
        // If they're empty, we throw an error
        if (semester === "" || courseStr === "") {
            throw new Error();
        }
        let courses = courseStr.split(',').slice(0, 10);
        return [semester, courses];
    }
    catch (err) {
        throw new Error("URL parameters are empty - <a href='addCourses.html'>Go back to course selection</a>");
    }
}
/*
Saves the courses
*/
function getCoursesFromUrl() {
    return __awaiter(this, void 0, void 0, function* () {
        let output = [];
        let semester;
        let courses;
        [semester, courses] = getCourseInfoFromUrl();
        for (let i = 0; i < courses.length; i++) {
            // Handle the input and getting the course
            let course = handleUserInput(courses[i], semester);
            yield handleGetCourse(course);
            output.push(course.sections());
        }
        return output;
    });
}
