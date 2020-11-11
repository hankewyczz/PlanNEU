/*
Grab the Courses from the URLs, and save the Courses
	- @return (void)
*/
async function getCoursesFromUrl(): Promise<Section[][]> {
	let output: Section[][] = [];
	let url: URLSearchParams;
	let courses: string[];
	let semester: string;

	try {
		url = new URLSearchParams(window.location.href);
		semester = (url.get('semester') as string);
		courses = (url.get('courses') as string).split(',');
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
			let course: Course = await handleUserInput(courses[i], semester);
			await handleGetCourse(course);
			output.push(course.sections());
		}
	}
	catch (err) {
		handleErr(err.message);
	}
	return output;
}