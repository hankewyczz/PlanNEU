describe("Testing comparators", function() {
	let r1;
	let r2;

	beforeAll(function() {
		let content1 = {
			"results": [{
				"class": {
					"name": "Name"
				},
				"sections":
					[{ "crn": "1", "seatsRemaining": 10, "profs": ["Amit Shesh"], "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 34800, "start": 28800 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "crn": "2", "seatsRemaining": 10, "profs": ["Joe Lastname"], "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "crn": "3", "seatsRemaining": 10, "profs": ["Joe Aoun"], "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "crn": "4", "seatsRemaining": 10, "profs": ["Ben Lerner"], "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "crn": "5", "seatsRemaining": 10, "profs": ["Abhi Shelat"], "honors": true, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "crn": "6", "seatsRemaining": 10, "profs": ["Firstname Lastname"], "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 54900, "start": 48900 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "crn": "7", "seatsRemaining": 10, "profs": ["Nat Tuck"], "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 61500, "start": 55500 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "crn": "8", "seatsRemaining": 10, "profs": ["Trudy Weigel"], "honors": true, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 68100, "start": 62100 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "crn": "9", "seatsRemaining": 10, "profs": ["Travis Junior"], "honors": false, "meetings": [{ "type": "Class", "times": {}, "where": "TBA", "endDate": 18738, "startDate": 18646 }] }]
			}]
		};

		let content2 = {
			"results": [{
				"class": {
					"name": "Name"
				},
				"sections":
					[{ "crn": "1", "seatsRemaining": 15, "profs": ["George Washington"], "honors": false, "meetings": [{ "type": "Class", "times": { "3": [{ "end": 72000, "start": 20000 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "crn": "2", "seatsRemaining": 2, "profs": ["John Adam"], "honors": true, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] }]
			}]
		};

		let course1 = new Course("CS", "2511", "202130");
		let course2 = new Course("CS", "2500", "202130");
		saveCourse(course1, content1);
		saveCourse(course2, content2);

		r1 = new Result(course1.sections());
		r2 = new Result(course2.sections());
	})

	it("Compare days off", function() {
		// R1 has more days off than R2
		expect(compareDaysOff(r1, r2)).toBeLessThan(0);
		expect(compareDaysOff(r2, r1)).toBeGreaterThan(0);
	})

	it("Compare start time", function() {
		// R2 starts before R1, so we want R1 to come first
		expect(compareStartTime(r1, r2)).toBeLessThan(0);
		expect(compareStartTime(r2, r1)).toBeGreaterThan(0);
	})

	it("Compare end time", function() {
		// R2 ends after R1, so we want R1 to come first
		expect(compareEndTime(r1, r2)).toBeLessThan(0);
		expect(compareEndTime(r2, r1)).toBeGreaterThan(0);
	})

	it("Compare seats left", function() {
		// R1 has more seats remaining
		expect(compareSeatsLeft(r1, r2)).toBeLessThan(0);
		expect(compareSeatsLeft(r2, r1)).toBeGreaterThan(0);
	})

	it("Compare honors courses", function() {
		// R! has more honors courses
		expect(compareHonorsCourses(r1, r2)).toBeLessThan(0);
		expect(compareHonorsCourses(r2, r1)).toBeGreaterThan(0);
	})



})