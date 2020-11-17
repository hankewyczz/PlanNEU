beforeEach(function() {
	USER_SECTIONS = {};
})

describe("Section Utils", function() {
	it("Creating a Section", function() {
		let crn = "123";
		let courseName = "abc";
		let content = { "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }], 
		"5": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] }; 


		let sec = new Section(crn, courseName, "!23", content);
		expect(sec.crn).toBe(crn);
		expect(sec.courseName).toBe(courseName);
		expect(sec.content).toBe(content);
	});
})