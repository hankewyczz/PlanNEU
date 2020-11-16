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
// For each course, we store an array of the course Sections
var sectionArrOfArr;
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
/* Handle fetching the course/sections from the URL and parsing */
function prepareSections() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            handleMessage("Fetching course section data...");
            sectionArrOfArr = yield getCoursesFromUrl();
            handleMessage("Fetched all section data");
            let combinations = howManyCombinations(sectionArrOfArr);
            let combinationStr = combinations.toLocaleString();
            const COMBO_WARNING = 100000; // If we have more than this amount of combinations, warn the user
            const COMBO_ERROR = 10000000; // Ditto, but if it's over this number, throw an error
            if (combinations >= COMBO_ERROR) {
                handleMessage(`Over ${COMBO_ERROR.toLocaleString()} possible schedule combinations.
				Please remove some courses and try again.`, Message.Error);
            }
            else if (combinations >= COMBO_WARNING) {
                handleMessage(`Over ${COMBO_WARNING.toLocaleString()} possible schedule combinations`, Message.Warning);
            }
            else {
                handleMessage(`${combinationStr} possible schedule combinations`);
            }
            // Enable the submit button
            document.getElementById("submit-filters").disabled = false;
        }
        catch (err) {
            console.log(err);
            handleMessage(err.message, Message.Error);
        }
    });
}
/* Handles the parsing and validation of the user information */
function handleFilterInputs() {
    let filter = new Filter();
    // Do we only want to show the open schedules?
    let onlyOpenStr = document.querySelector('input[name="open-seats"]:checked').value;
    if (onlyOpenStr === 'true') {
        filter.add(isSeatsLeft);
    }
    // Get the start/end time values
    let startStr = document.getElementById("start-time").value;
    let endStr = document.getElementById("end-time").value;
    let start = startStr.split(':');
    let end = endStr.split(':');
    let startTime = (+start[0]) * 60 * 60 + (+start[1]) * 60;
    let endTime = (+end[0]) * 60 * 60 + (+end[1]) * 60;
    if (startTime > endTime) {
        throw new Error("Start time must be before the end time");
    }
    filter.add((s) => isValidTime(s, startTime, endTime));
    // Deal with days off
    let minDaysOffStr = document.getElementById("min-days-off").value;
    let minDaysOff = parseInt(minDaysOffStr);
    if (minDaysOff < 0 || minDaysOff > 4) {
        throw new Error("Days off must be between 0 and 4");
    }
    // Get the specific days off
    let specificDaysOff = [];
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    for (var i = 0; i < checkboxes.length; i++) {
        specificDaysOff.push(checkboxes[i].value);
    }
    if (specificDaysOff.length > minDaysOff) {
        throw new Error(`Number of selected days (${specificDaysOff.length}) is greater than the number of days off (${minDaysOff})`);
    }
    filter.add(s => enoughDaysOff(s, minDaysOff, specificDaysOff));
    // Honors courses
    let honorsStr = document.querySelector('input[name="honors-courses"]:checked').value;
    let honors = (honorsStr == 'true');
    let minHonorsStr = document.getElementById("min-honors").value;
    let minHonors = parseInt(minHonorsStr);
    if (minHonors < 0) {
        throw new Error("Minimum honors courses must be non-negative");
    }
    else if (minHonors > 0) {
        honors = true;
    }
    if (honors) {
        filter.add(s => (anyHonors(s) && meetsMinHonorsReq(s, minHonors)));
    }
    else {
        // Return false if there are any honors courses
        filter.add(s => !anyHonors(s));
    }
    return filter;
}
// Generate the results
function handleGenerateScheduleAndFilter() {
    try {
        handleMessage("Generating all combinations...");
        let filter = handleFilterInputs();
        let combinations = createCombinations(sectionArrOfArr, filter);
        console.log(combinations);
        for (let i = 0; i < combinations.length; i++) {
            console.log(new Result(combinations[i]).toString());
        }
        handleMessage(`Generated ${combinations.length} results`, Message.Success);
    }
    catch (err) {
        console.log(err);
        handleMessage(err.message, Message.Error);
    }
}
