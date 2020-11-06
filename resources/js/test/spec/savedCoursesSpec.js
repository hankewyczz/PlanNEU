beforeEach(function() {
	USER_COURSES = {};
})

// Tests alreadyAdded, getCourse, addCourse, and removeCourse
describe("Check CRD for stored courses", function() {
	it("Not added yet", function() {
		expect(function() { getCourse("CS", "3500"); }).toThrow();
	});

	it("Create, Read, Delete", function() {
		addCourse("CS", "3500", {results: [1]});

		expect(alreadyAdded("CS", "3500")).toBe(true);
		expect(getCourse("CS", "3500")).toBe(1);

		removeCourse("CS", "3500");
		
		expect(function() { getCourse("CS", "3500"); }).toThrow();
		expect(alreadyAdded("CS", "3500")).toBe(false);
	});

	it("Empty get", function() {
		expect(function() { getCourse("CS", "3500"); }).toThrow();
	})
})