var SEMESTER = "202130";

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

});

// Tests getQueryUrl
describe("Check the construction of the query URL", function() {
	it("Basic check", function() {
		var out = getQueryUrl(parseCourseInput("cs 3500", SEMESTER));
		expect(decodeURI(out)).toBe(decodeURI(
			"https://cors-anywhere.herokuapp.com/https://searchneu.com/search?&query=&termId="
			+ "202130&minIndex=0&maxIndex=1&apiVersion=2&filters={\"subject\"%3A[\"CS\"]%2C\"classIdRange\"%3A"
			+ "{\"min\"%3A3500%2C\"max\"%3A3500}}"));
	});
});



// Tests getCourseFromApi
describe("Fetching data from SearchNEU", function() {
	it("Is API working (Spring, 2021)", async function() {
		let cs3500 = new Course("CS", "3500", SEMESTER);

		// Initial
		expect(cs3500.alreadySaved()).toBe(false);
		// Actually get the class this time
		
		var response = await getCourseFromApi(cs3500);
		// Same call as the first time, but now we've gotten the class before
		expect(cs3500.alreadySaved()).toBe(true); 
	})
})
