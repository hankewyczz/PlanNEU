// Test parseInputCourse()
describe("Parse input representing a single class", function() {

	// Tests what happens in the empty case
	it("Empty case", function() {
		// We expect an error from the empty case
		expect(function() { parseInputCourse(""); }).toThrow(); 			// No input
		expect(function() { parseInputCourse(" "); }).toThrow();			// A space
		expect(function() { parseInputCourse("	"); }).toThrow();		// A tab
		expect(function() { parseInputCourse(" 	\n   "); }).toThrow();	// Mixed whitespace
	});

	it("Valid input, no spaces", function() {
		var out = parseInputCourse("cs3500");
		expect(out[0]).toBe("CS");
		expect(out[1]).toBe("3500");

		var out1 = parseInputCourse("CS3500");
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
	})

	it("Invalid input - num/course", function() {
		expect(function() { parseInputCourse("12345"); }).toThrow();
		expect(function() { parseInputCourse("history"); }).toThrow();
		expect(function() { parseInputCourse("history 12390"); }).toThrow();
		expect(function() { parseInputCourse("Object Oriented Design: cs3500"); }).toThrow();
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
			"https://searchneu.com/search?&query=&termId=202130&minIndex=0&maxIndex=1&apiVersion=2&filters={"
			+ "%22subject%22%3A[%22CS%22]%2C%22classIdRange%22%3A{%22min%22%3A3500%2C%22max%22%3A3500}}"));
	})
})