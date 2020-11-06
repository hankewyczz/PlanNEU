// Test parseCourseInput()
describe("Parse input representing a single course", function() {

	it("Empty case", function() {
		// We expect an error from the empty case
		expect(function() { parseCourseInput(""); }).toThrow(); 			// No input
		expect(function() { parseCourseInput(" "); }).toThrow();			// A space
		expect(function() { parseCourseInput("	"); }).toThrow();			// A tab
		expect(function() { parseCourseInput(" 	\n   "); }).toThrow();		// Mixed whitespace
	});

	it("Invalid input, too short", function() {
		expect(function() { parseCourseInput("cs12"); }).toThrow();
		expect(function() { parseCourseInput("cs1"); }).toThrow();
		expect(function() { parseCourseInput("a1"); }).toThrow();
		expect(function() { parseCourseInput("a"); }).toThrow();
	})

	it("Valid input, no spaces", function() {
		var out = parseCourseInput("acct1201");
		expect(out[0]).toBe("ACCT");
		expect(out[1]).toBe("1201");

		var out1 = parseCourseInput("aCcT1201");
		expect(out1[0]).toBe(out[0]);
		expect(out1[1]).toBe(out[1]);
	})

	it("Valid input, trailing/leading spaces", function() {
		var out = parseCourseInput("   	hist2211");
		expect(out[0]).toBe("HIST");
		expect(out[1]).toBe("2211");

		var out1 = parseCourseInput("hIsT2211\n ");
		expect(out1[0]).toBe(out[0]);
		expect(out1[1]).toBe(out[1]);
	})

	it("Valid input, mixed spaces", function() {
		var out = parseCourseInput("fina 2319 ");
		expect(out[0]).toBe("FINA");
		expect(out[1]).toBe("2319");

		var out1 = parseCourseInput(" FINA2319 ");
		expect(out1[0]).toBe(out[0]);
		expect(out1[1]).toBe(out[1]);

		var out2 = parseCourseInput(" fina 2 3 1 9 ");
		expect(out2[0]).toBe(out[0]);
		expect(out2[1]).toBe(out[1]);
	})


	it("Invalid input, invalid subject", function() {
		expect(function() { parseCourseInput("cs/cy 1234"); }).toThrow();
		expect(function() { parseCourseInput("accounting - 1210"); }).toThrow();
		expect(function() { parseCourseInput("УКР 1234"); }).toThrow();
		expect(function() { parseCourseInput("12345"); }).toThrow();
		expect(function() { parseCourseInput("c0mputerscience 1234"); }).toThrow();
		expect(function() { parseCourseInput("test.1234"); }).toThrow();
		expect(function() { parseCourseInput("hist-1234"); }).toThrow();
		expect(function() { parseCourseInput("Object Orientehistd Design: cs3500"); }).toThrow();
	})


	it("Invalid input, invalid courseId", function() {
		expect(function() { parseCourseInput("computer"); }).toThrow();
		expect(function() { parseCourseInput("history"); }).toThrow();
		expect(function() { parseCourseInput("hist -123"); }).toThrow();
		expect(function() { parseCourseInput("ARMY 1e12"); }).toThrow();
		expect(function() { parseCourseInput("FINA 9e99"); }).toThrow();
		expect(function() { parseCourseInput("hist null"); }).toThrow();
		expect(function() { parseCourseInput("acct 0x11"); }).toThrow();
	})

});

// Tests getQueryUrl
describe("Check the construction of the query URL", function() {
	it("Basic check", function() {
		var parse = parseCourseInput("cs 3500");
		var semester = "202130"; // Spring 2021
		var out = getQueryUrl(parse[0], parse[1], semester);
		expect(decodeURI(out)).toBe(decodeURI(
			"https://cors-anywhere.herokuapp.com/https://searchneu.com/search?&query=&termId=202130&minIndex=0&"
			+ "maxIndex=1&apiVersion=2&filters={%22subject%22%3A[%22CS%22]%2C%22classIdRange%22%3A{"
			+ "%22min%22%3A3500%2C%22max%22%3A3500}}"));
	});
});



// Tests getCourseFromApi
describe("Fetching data from SearchNEU", function() {
	it("Is API working (Spring, 2021)", async function() {
		// Reset the gotten courses
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
		var response = await getCourseFromApi("CS", "3500", "202130");
		expect(alreadyAdded("CS", "3500", response)).toBe(true); // Spring 2021
		expect(getCourseName("CS", "3500")).toBe("CS3500: Object-Oriented Design");
	})
});