beforeEach(function() {
	USER_COURSES = {};
})

// Tests alreadySaved, getCourse, addCourse, and removeCourse
describe("Check CRD for stored courses", function() {
	it("Not added yet", function() {
		expect(function() { getSavedCourse("CS3500"); }).toThrow();
	});

	it("Create, Read, Delete", function() {
		cs3500 = new Course("CS", "3500");
		saveCourse(cs3500, {results: [1]});

		expect(cs3500.alreadySaved()).toBe(true);
		expect(getSavedCourse("CS3500")).toBe(1);

		removeSavedCourse("CS3500");
		
		expect(function() { getSavedCourse("CS3500"); }).toThrow();
		expect(cs3500.alreadySaved()).toBe(false);
	});

	it("Empty get", function() {
		expect(function() { getSavedCourse("CS3500"); }).toThrow();
	})
})