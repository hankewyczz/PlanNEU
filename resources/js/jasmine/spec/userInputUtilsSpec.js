// Test parseInputCourse()
describe("Parse input representing a single course", function() {

	it("Empty case", function() {
		// We expect an error from the empty case
		expect(function() { parseInputCourse(""); }).toThrow(); 			// No input
		expect(function() { parseInputCourse(" "); }).toThrow();			// A space
		expect(function() { parseInputCourse("	"); }).toThrow();			// A tab
		expect(function() { parseInputCourse(" 	\n   "); }).toThrow();		// Mixed whitespace
	});

	it("Invalid input, too short", function() {
		expect(function() { parseInputCourse("cs12"); }).toThrow();
		expect(function() { parseInputCourse("cs1"); }).toThrow();
		expect(function() { parseInputCourse("a1"); }).toThrow();
		expect(function() { parseInputCourse("a"); }).toThrow();
	})

	it("Valid input, no spaces", function() {
		var out = parseInputCourse("acct1201");
		expect(out[0]).toBe("ACCT");
		expect(out[1]).toBe("1201");

		var out1 = parseInputCourse("aCcT1201");
		expect(out1[0]).toBe(out[0]);
		expect(out1[1]).toBe(out[1]);
	})

	it("Valid input, trailing/leading spaces", function() {
		var out = parseInputCourse("   	hist2211");
		expect(out[0]).toBe("HIST");
		expect(out[1]).toBe("2211");

		var out1 = parseInputCourse("hIsT2211\n ");
		expect(out1[0]).toBe(out[0]);
		expect(out1[1]).toBe(out[1]);
	})

	it("Valid input, mixed spaces", function() {
		var out = parseInputCourse("fina 2319 ");
		expect(out[0]).toBe("FINA");
		expect(out[1]).toBe("2319");

		var out1 = parseInputCourse(" FINA2319 ");
		expect(out1[0]).toBe(out[0]);
		expect(out1[1]).toBe(out[1]);

		var out2 = parseInputCourse(" fina 2 3 1 9 ");
		expect(out2[0]).toBe(out[0]);
		expect(out2[1]).toBe(out[1]);
	})


	it("Invalid input, invalid subject", function() {
		expect(function() { parseInputCourse("cs/cy 1234"); }).toThrow();
		expect(function() { parseInputCourse("accounting - 1210"); }).toThrow();
		expect(function() { parseInputCourse("УКР 1234"); }).toThrow();
		expect(function() { parseInputCourse("12345"); }).toThrow();
		expect(function() { parseInputCourse("c0mputerscience 1234"); }).toThrow();
		expect(function() { parseInputCourse("test.1234"); }).toThrow();
		expect(function() { parseInputCourse("hist-1234"); }).toThrow();
		expect(function() { parseInputCourse("Object Orientehistd Design: cs3500"); }).toThrow();
	})


	it("Invalid input, invalid courseId", function() {
		expect(function() { parseInputCourse("computer"); }).toThrow();
		expect(function() { parseInputCourse("history"); }).toThrow();
		expect(function() { parseInputCourse("hist -123"); }).toThrow();
		expect(function() { parseInputCourse("ARMY 1e12"); }).toThrow();
		expect(function() { parseInputCourse("FINA 9e99"); }).toThrow();
		expect(function() { parseInputCourse("hist null"); }).toThrow();
		expect(function() { parseInputCourse("acct 0x11"); }).toThrow();
	})

});


// Tests alreadyAdded
/*describe("Check if this course has already been added", function() {
	it("Not added yet", function() {
		var str = parseInputCourse("fina 2319 ");
		var out = alreadyAdded(str.join(''));

		expect(out).toBe(false);

		// Go again
		parseInputCourse("fina 2319 ");
		var out2 = alreadyAdded(str.join(''));

		expect(out2).toBe(true);
	})
})*/


// Tests getQueryUrl
describe("Check the construction of the query URL", function() {
	it("Basic check", function() {
		var parse = parseInputCourse("cs 3500");
		var semester = "202130"; // Spring 2021
		var out = getQueryUrl(parse[0], parse[1], semester);
		expect(decodeURI(out)).toBe(decodeURI(
			"https://cors-anywhere.herokuapp.com/https://searchneu.com/search?&query=&termId=202130&minIndex=0&"
			+ "maxIndex=1&apiVersion=2&filters={%22subject%22%3A[%22CS%22]%2C%22classIdRange%22%3A{"
			+ "%22min%22%3A3500%2C%22max%22%3A3500}}"));
	})
})

// Tests getCourseFromApi
describe("Fetching data from SearchNEU", function() {
	it("Is API working (Spring, 2021)", async function() {
		// Reset the gotten courses
		USER_COURSES = {};
		// Initial
		expect(alreadyAdded("CS", "3500", "")).toBe(false);
		// Actually get the class this time
		var response = await getCourseFromApi("CS", "3500", "202130");
		expect(alreadyAdded("CS", "3500", response)).toBe(true); // Spring 2021
		// Same call as the first time, but now we've gotten the class before
		expect(alreadyAdded("CS", "3500", "")).toBe(true);
	})
})

// Tests getCourseName
describe("Fetching data, parsing the name", function() {
	it("Gets the course name", async function() {
		// Reset the gotten courses
		USER_COURSES = {};
		var response = await getCourseFromApi("CS", "3500", "202130");
		expect(alreadyAdded("CS", "3500", response)).toBe(true); // Spring 2021
		expect(getCourseName("CS", "3500")).toBe("CS3500: Object-Oriented Design");
	})
})
