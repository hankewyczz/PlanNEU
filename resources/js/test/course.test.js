var SEMESTER = "202130"; 

beforeEach(function() {
	USER_COURSES = {};
})


// Tests Course function
describe("Course functionality", function() {
	it("Creating a Course", function() {
		let subject = "CS";
		let courseId = "3500";


		let c = new Course(subject, courseId, SEMESTER);

		expect(c.subject).toBe(subject);
		expect(c.courseId).toBe(courseId);
		expect(c.semester).toBe(SEMESTER);
		expect(c.name).toBe(subject + courseId);
		expect(c.name).toBe(c.fullName);
		expect(c.content).toEqual({});
	});


	it("Adding content", function() {
		let subject = "CS";
		let courseId = "3500";


		let c = new Course(subject, courseId, SEMESTER);

		let contentResults = { "class": { "name": "FULLNAME" } };
		let content = { "results": [contentResults] };

		c.addContent(content);

		expect(c.content).toEqual(contentResults);
		expect(c.fullName).toBe("CS3500: FULLNAME");
	})


	it("Saving a course", function() {
		let subject = "CS";
		let courseId = "3500";


		let c = new Course(subject, courseId, SEMESTER);

		let contentResults = { "class": { "name": "FULLNAME" } };
		let content = { "results": [contentResults] };

		saveCourse(c, content);

		expect(c.alreadySaved()).toBe(true);
		expect(alreadySaved(c.name)).toBe(true);
		expect(c.content).toEqual(contentResults);
		expect(c.fullName).toBe("CS3500: FULLNAME");
	})
})


// Tests alreadySaved, getCourse, addCourse, and removeCourse
describe("Check CRD for stored courses", function() {
	it("Not added yet", function() {
		expect(function() { getSavedCourse("CS3500"); }).toThrow();
	});

	it("Create, Read, Delete", function() {
		cs3500 = new Course("CS", "3500");
		saveCourse(cs3500, {results: [{"class": {"name": "Name"}}]});

		expect(cs3500.alreadySaved()).toBe(true);
		expect(getSavedCourse("CS3500").content.class.name).toBe("Name");

		removeSavedCourse("CS3500");
		
		expect(function() { getSavedCourse("CS3500"); }).toThrow();
		expect(cs3500.alreadySaved()).toBe(false);
	});

	it("Empty get", function() {
		expect(function() { getSavedCourse("CS3500"); }).toThrow();
	})
})



// Test parseCourseInput()
describe("Parse input representing a single course", function() {

	it("Empty case", function() {
		// We expect an error from the empty case
		expect(function() { parseCourseInput("", SEMESTER); }).toThrow(); 			// No input
		expect(function() { parseCourseInput(" ", SEMESTER); }).toThrow();			// A space
		expect(function() { parseCourseInput("	", SEMESTER); }).toThrow();			// A tab
		expect(function() { parseCourseInput(" 	\n   ", SEMESTER); }).toThrow();		// Mixed whitespace
	});

	it("Invalid input, too short", function() {
		expect(function() { parseCourseInput("cs12", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("cs1", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("a1", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("a", SEMESTER); }).toThrow();
	})

	it("Valid input, no spaces", function() {
		var c1 = parseCourseInput("acct1201", SEMESTER);
		expect(c1.subject).toBe("ACCT");
		expect(c1.courseId).toBe("1201");

		var c2 = parseCourseInput("aCcT1201", SEMESTER);
		expect(c2.subject).toBe(c1.subject);
		expect(c2.courseId).toBe(c1.courseId);
	})

	it("Valid input, trailing/leading spaces", function() {
		var out = parseCourseInput("   	hist2211", SEMESTER);
		expect(out.subject).toBe("HIST");
		expect(out.courseId).toBe("2211");

		var out1 = parseCourseInput("hIsT2211\n ", SEMESTER);
		expect(out1.subject).toBe(out.subject);
		expect(out1.courseId).toBe(out.courseId);
	})

	it("Valid input, mixed spaces", function() {
		var out = parseCourseInput("fina 2319 ", SEMESTER);
		expect(out.subject).toBe("FINA");
		expect(out.courseId).toBe("2319");

		var out1 = parseCourseInput(" FINA2319 ", SEMESTER);
		expect(out1.subject).toBe(out.subject);
		expect(out1.courseId).toBe(out.courseId);

		var out2 = parseCourseInput(" fina 2 3 1 9 ", SEMESTER);
		expect(out2.subject).toBe(out.subject);
		expect(out2.courseId).toBe(out.courseId);
	})


	it("Invalid input, invalid subject", function() {
		expect(function() { parseCourseInput("cs/cy 1234", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("accounting - 1210", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("УКР 1234", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("12345", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("c0mputerscience 1234", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("test.1234", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("hist-1234", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("Object Orientehistd Design: cs3500", SEMESTER); }).toThrow();
	})


	it("Invalid input, invalid courseId", function() {
		expect(function() { parseCourseInput("computer", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("history", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("hist -123", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("ARMY 1e12", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("FINA 9e99", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("hist null", SEMESTER); }).toThrow();
		expect(function() { parseCourseInput("acct 0x11", SEMESTER); }).toThrow();
	})


	it("Number validity", function() {
		expect(isValidNum("1234")).toBe(true);
		expect(isValidNum("1")).toBe(true);
		expect(isValidNum("234")).toBe(true);
		expect(isValidNum("120938")).toBe(true);
		expect(isValidNum("0001")).toBe(true);

		expect(isValidNum("1e12")).toBe(false);
		expect(isValidNum("0x12")).toBe(false);
		expect(isValidNum("abc")).toBe(false);
		expect(isValidNum("cs2500")).toBe(false);
	})
});



// Tests getQueryUrl
describe("Check the construction of the query URL", function() {
	it("Basic check", function() {
		var out = getQueryUrl(parseCourseInput("cs 3500", SEMESTER));
		expect(decodeURI(out)).toBe(decodeURI(
			BASE_API_URL + "&query=&termId="
			+ "202130&minIndex=0&maxIndex=1&apiVersion=2&filters={\"subject\"%3A[\"CS\"]%2C\"classIdRange\"%3A"
			+ "{\"min\"%3A3500%2C\"max\"%3A3500}}"));
	});
});



describe("Coreqs", function() {
	it("valueToStr", function() {
		let c = new Course("CS", "3500", SEMESTER);

		let contentResults = {
			"class": {
				"coreqs": {
					"type": "or",
					"values": [
						{
							"classId": "1500",
							"missing": true,
							"subject": "CS"
						},
						{
							"type": "and",
							"values": [
								{
									"classId": "2510",
									"subject": "CS"
								},
								{
									"classId": "1800",
									"subject": "CS"
								}
							]
						},
						{
							"classId": "2160",
							"subject": "EECE"
						},
						{
							"classId": "2162",
							"missing": true,
							"subject": "EECE"
						},
						{
							"classId": "2164",
							"missing": true,
							"subject": "EECE"
						}
					]
				}
			}
		};

		let content = { "results": [contentResults] };
		saveCourse(c, content);
		
		let expectedOut = "Corequisite courses (click to add): ((<a href=\"#\" onclick=\"handleSingleCourse('CS2510',"
			+ " '202130')\">CS2510</a> and <a href=\"#\" onclick=\"handleSingleCourse('CS1800', '202130')\">CS1800</a>)"
			+ "  or <a href=\"#\" onclick=\"handleSingleCourse('EECE2160', '202130')\">EECE2160</a>)";

		expect(getCoreqs(c)).toBe(expectedOut);
	});
})