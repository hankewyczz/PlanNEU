/*
Grabs the courses and semester info from the URL */
function getCourseInfoFromUrl(): [string, string[]] {
	try {
		let url: URLSearchParams = new URLSearchParams(window.location.href);
		let semester: string = (url.get('semester') as string);
		let courseStr: string = (url.get('courses') as string);

		// If they're empty, we throw an error
		if (semester === "" || courseStr === "") {
			throw new Error();
		}

		let courses: string[] = courseStr.split(',').slice(0, 10);

		return [semester, courses];
	}
	catch (err) {
		throw new Error("URL parameters are empty - <a href='addCourses.html'>Go back to course selection</a>");
	}
	
}


/*
Saves the courses
*/
async function getCoursesFromUrl(): Promise<Section[][]> {
	let output: Section[][] = [];
	let semester: string;
	let courses: string[];

	[semester, courses] = getCourseInfoFromUrl();

	for (let i = 0; i < courses.length; i++) {
		// Handle the input and getting the course
		let course: Course = handleUserInput(courses[i], semester);
		await handleGetCourse(course);
		output.push(course.sections());
	}
	
	return output;
}