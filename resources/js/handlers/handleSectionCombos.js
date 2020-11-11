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
/*
Grab the Courses from the URLs, and save the Courses
    - @return (void)
*/
function getCoursesFromUrl() {
    return __awaiter(this, void 0, void 0, function* () {
        let output = [];
        let url;
        let courses;
        let semester;
        try {
            url = new URLSearchParams(window.location.href);
            semester = url.get('semester');
            courses = url.get('courses').split(',');
            courses = courses.slice(0, 10);
            console.log(courses);
        }
        catch (err) {
            handleErr("URL parameters are empty - <a href='addCourses.html'>Go back to course selection</a>");
            return [];
        }
        try {
            for (let i = 0; i < courses.length; i++) {
                // Handle the input and getting the course
                let course = yield handleUserInput(courses[i], semester);
                yield handleGetCourse(course);
                output.push(course.sections());
            }
        }
        catch (err) {
            handleErr(err.message);
        }
        return output;
    });
}
