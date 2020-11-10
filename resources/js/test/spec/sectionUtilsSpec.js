beforeEach(function() {
	USER_SECTIONS = {};
})

describe("Section Utils", function() {
	it("Creating a Section", function() {
		let crn = "123";
		let courseName = "abc";
		let content = { "test": "123" };

		let sec = new Section(crn, courseName, content);
		expect(sec.crn).toBe(crn);
		expect(sec.courseName).toBe(courseName);
		expect(sec.content).toBe(content);
	});

	it("Saving a section", function() {
		let crn = "123";
		let courseName = "abc";
		let content = { "test": "123" };

		let sec = new Section(crn, courseName, content);

		expect(sec.alreadySaved()).toBe(false);

		saveSection(sec);

		expect(sec.alreadySaved()).toBe(true);
	})

	it("Removing a section", function() {
		let crn = "123";
		let courseName = "abc";
		let content = { "test": "123" };

		let sec = new Section(crn, courseName, content);

		expect(sec.alreadySaved()).toBe(false);
		saveSection(sec);
		expect(sec.alreadySaved()).toBe(true);

		removeSavedSection(sec.crn);
		expect(sec.alreadySaved()).toBe(false);
	})

	it("Get a saved section", function() {
		let crn = "123";
		let courseName = "abc";
		let content = { "test": "123" };

		let sec = new Section(crn, courseName, content);

		expect(sec.alreadySaved()).toBe(false);
		saveSection(sec);
		expect(sec.alreadySaved()).toBe(true);
		
		expect(getSavedSection("123")).toBe(sec);
	})
})