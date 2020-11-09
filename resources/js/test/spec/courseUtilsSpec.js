beforeEach(function() {
	USER_COURSES = {};
})

// Tests alreadyAdded, getCourse, addCourse, and removeCourse
describe("Check CRD for stored courses", function() {
	it("Not added yet", function() {
		expect(function() { getCourse("CS3500"); }).toThrow();
	});

	it("Create, Read, Delete", function() {
		cs3500 = new Course("CS", "3500");
		addCourse(cs3500, {results: [1]});

		expect(alreadyAdded("CS3500")).toBe(true);
		expect(getCourse("CS3500")).toBe(1);

		removeCourse("CS3500");
		
		expect(function() { getCourse("CS3500"); }).toThrow();
		expect(alreadyAdded("CS3500")).toBe(false);
	});

	it("Empty get", function() {
		expect(function() { getCourse("CS3500"); }).toThrow();
	})
})