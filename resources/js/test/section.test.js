beforeEach(function() {
	USER_SECTIONS = {};
})

describe("Section Utils", function() {
	it("Creating a Section", function() {
		let content = { "profs": ["Joe Aoun"], "crn": "123", 
		"meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }], 
		"5": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] }; 
			
		let course = new Course("CS", "3500", "1234");
		
		let sec = new Section(course, content);
		expect(sec.crn).toBe("123");
		expect(sec.name).toBe("CS3500");
		expect(sec.content).toBe(content);
	});
})


describe("timesOverlap: single day", function() {

	it("Same start and end time", function() {
		let time1 = {
			"end": 41400,
			"start": 35400
		};

		let time2 = {
			"end": 41400,
			"start": 35400
		};

		expect(timesOverlap(time1, time2)).toBe(true);
	});


	it("Same start, end after", function() {
		let time1 = {
			"end": 41500,
			"start": 35400
		};

		let time2 = {
			"end": 41400,
			"start": 35400
		};

		timesOverlap(time1, time2)
		expect(timesOverlap(time1, time2)).toBe(true);
	});



	it("Same start, end before", function() {
		let time1 = {
			"end": 41300,
			"start": 35400
		};

		let time2 = {
			"end": 41400,
			"start": 35400
		};

		expect(timesOverlap(time1, time2)).toBe(true);

	});


	it("Early start, same end", function() {
		let time1 = {
			"end": 41400,
			"start": 35000
		};

		let time2 = {
			"end": 41400,
			"start": 35400
		};

		expect(timesOverlap(time1, time2)).toBe(true);
	});


	it("Late start, same end", function() {
		let time1 = {
			"end": 41400,
			"start": 36400
		};

		let time2 = {
			"end": 41400,
			"start": 35400
		};

		expect(timesOverlap(time1, time2)).toBe(true);
	});


	it("Early start, late end", function() {
		let time1 = {
			"end": 41500,
			"start": 35000
		};

		let time2 = {
			"end": 41400,
			"start": 35400
		};

		expect(timesOverlap(time1, time2)).toBe(true);
	});


	it("Late start, early end", function() {
		let time1 = {
			"end": 41300,
			"start": 36400
		};

		let time2 = {
			"end": 41400,
			"start": 35400
		};

		expect(timesOverlap(time1, time2)).toBe(true);
	});


	it("Only end/start overlaps", function() {
		let time1 = {
			"end": 41500,
			"start": 41400
		};

		let time2 = {
			"end": 41400,
			"start": 35400
		};

		expect(timesOverlap(time1, time2)).toBe(true);
	})


	it("Only end/start overlaps", function() {
		let time1 = {
			"end": 44400,
			"start": 41400
		};

		let time2 = {
			"end": 41400,
			"start": 35400
		};

		expect(timesOverlap(time1, time2)).toBe(true);
	})

	it("No overlap", function() {
		let time1 = {
			"end": 34800,
			"start": 28800
		};

		let time2 = {
			"end": 41400,
			"start": 35400
		};

		expect(timesOverlap(time1, time2)).toBe(false);
	})
})






describe("Test anyTimesOverlap", function() {
	it("Same start and end time", function() {
		let time1 = [{
			"end": 41400,
			"start": 35400
		}];

		let time2 = [{
			"end": 41400,
			"start": 35400
		},
		{
			"end": 41400,
			"start": 35400
		}];

		expect(anyTimesOverlap(time1, time2)).toBe(true);
	});


	it("Same start, end after", function() {
		let time1 = [{
			"end": 41500,
			"start": 35400
		}];

		let time2 = [{
			"end": 41400,
			"start": 35400
		}];

		timesOverlap(time1, time2)
		expect(anyTimesOverlap(time1, time2)).toBe(true);
	});



	it("Same start, end before", function() {
		let time1 = [{
			"end": 41300,
			"start": 35400
		}];

		let time2 = [{
			"end": 41400,
			"start": 35400
		}];

		expect(anyTimesOverlap(time1, time2)).toBe(true);

	});


	it("Early start, same end", function() {
		let time1 = [{
			"end": 41400,
			"start": 35000
		}];

		let time2 = [{
			"end": 41400,
			"start": 35400
		}];

		expect(anyTimesOverlap(time1, time2)).toBe(true);
	});


	it("Late start, same end", function() {
		let time1 = [{
			"end": 41400,
			"start": 36400
		}];

		let time2 = [{
			"end": 41400,
			"start": 35400
		}];

		expect(anyTimesOverlap(time1, time2)).toBe(true);
	});


	it("Early start, late end", function() {
		let time1 = [{
			"end": 41500,
			"start": 35000
		}];

		let time2 = [{
			"end": 41400,
			"start": 35400
		}];

		expect(anyTimesOverlap(time1, time2)).toBe(true);
	});


	it("Late start, early end", function() {
		let time1 = [{
			"end": 41300,
			"start": 36400
		}];

		let time2 = [{
			"end": 41400,
			"start": 35400
		}];

		expect(anyTimesOverlap(time1, time2)).toBe(true);
	});



	it("No overlap", function() {
		let time1 = [{
			"end": 34800,
			"start": 28800
		},
		{
			"end": 66000,
			"start": 55500
		}];

		let time2 = [{
			"end": 41400,
			"start": 35400
		},
		{
			"end": 80000,
			"start": 70000
		}];

		expect(anyTimesOverlap(time1, time2)).toBe(false);
	})
})




var cs2511Content;
var cs2511;
var cs2511Secs;

describe("Test if Sections overlap", function() {
	beforeAll(function() {
		var USER_COURSES = {};
		cs2511Content = {
			"results": [{
				"class": {
					"name": "Name"
				},
				"sections":
					[{ "profs": ["Joe Aoun"], "crn": 1234, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 34800, "start": 28800 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": true, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 54900, "start": 48900 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 61500, "start": 55500 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 68100, "start": 62100 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "meetings": [{ "type": "Class", "times": {}, "where": "TBA", "endDate": 18738, "startDate": 18646 }] }]
			}]
		};



		cs2511 = new Course("CS", "2511", "202130");
		saveCourse(cs2511, cs2511Content);

		cs2511Secs = cs2511.sections();
	});


	it("CS2511", function() {
		let secContent = {
			"profs": ["Joe Aoun"],
			"crn": "123",
			"meetings": [{
				"type": "Class",
				"times": {
					"2": [
						{
							"end": 48300,
							"start": 42300
						}
					]
				}
			}
			]
		};

		let sec2Content = {
			"profs": ["Joe Aoun"],
			"crn": "234",
			"meetings": [{
				"type": "Class",
				"times": {
					"2": [
						{
							"start": 34200,
							"end": 42300,
						}]
				}
			}]
		};

		let course = new Course("CS", "3500", "1234");

		let fakeSec1 = new Section(course, secContent);
		let fakeSec2 = new Section(course, sec2Content);
		let secArr = [fakeSec1, fakeSec2];


		let counter = 0;

		for (let i = 0; i < cs2511Secs.length; i++) {
			counter += sectionsOverlap(fakeSec1, cs2511Secs[i]) ? 1 : 0;
		}

		expect(counter).toBe(2);

		counter = 0;
		for (let i = 0; i < cs2511Secs.length; i++) {
			for (let j = 0; j < secArr.length; j++) {
				counter += sectionsOverlap(secArr[j], cs2511Secs[i]) ? 1 : 0;
			}
		}

		expect(counter).toBe(7);
	});
})



var secArr;
describe("Generating Combinations", function() {
	beforeAll(function() {
		var USER_COURSES = {};
		cs2511Content = {
			"results": [{
				"class": {
					"name": "Name"
				},
				"sections":
					[{ "profs": ["Joe Aoun"], "crn": 1234, "seatsRemaining": 3, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 34800, "start": 28800 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "seatsRemaining": 0, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "seatsRemaining": 3, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "seatsRemaining": 2, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": true, "seatsRemaining": 20, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "seatsRemaining": 123, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 54900, "start": 48900 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "seatsRemaining": 23, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 61500, "start": 55500 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "seatsRemaining": 3, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 68100, "start": 62100 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "profs": ["Joe Aoun"], "honors": false, "seatsRemaining": 0, "meetings": [{ "type": "Class", "times": {}, "where": "TBA", "endDate": 18738, "startDate": 18646 }] }]
			}]
		};
		cs2511 = new Course("CS", "2511", "202130");
		cs2500 = new Course("CS", "2500", "202130");
		saveCourse(cs2511, cs2511Content);
		saveCourse(cs2500, cs2511Content);

		cs2511Secs = cs2511.sections();
		cs2500Secs = cs2500.sections();
		secArr = [cs2500Secs, cs2511Secs];
	})

	it("Creating combinations with no filter", function() {
		/*
		We have 81 possible combinations altogether.
		There are 4 sections that overlap (2 with each other), so that's -4
		Also, each section overlaps with itself (9) BUT not the online one (so 8)
		81 - 4 - 8 = 69
		 */
		let filter = new Filter();
		expect(createCombinations(secArr, filter).length).toBe(69)
	})

	it("Any honors", function() {
		let filter = new Filter();
		filter.add(anyHonors);

		/*
		81 possible combinations.
		Only 2 Sections are honors, and overlap with 2 others (so we have 2 * 7 possibilities)
		 */
		expect(createCombinations(secArr, filter).length).toBe(14);

		filter = new Filter();
		filter.add((s) => !anyHonors(s));
		// NO honors allowed
		expect(createCombinations(secArr, filter).length).toBe(55);
	})

	it("minHonors", function() {
		let filter = new Filter();
		filter.add((s) => meetsMinHonorsReq(s, 0));
		// We don't care about honors here
		expect(createCombinations(secArr, filter).length).toBe(69);

		filter = new Filter();
		filter.add((s) => meetsMinHonorsReq(s, 1));
		// We want 1 honors course
		expect(createCombinations(secArr, filter).length).toBe(14);

		filter = new Filter();
		filter.add((s) => meetsMinHonorsReq(s, 2));
		// We want 2, but don't have any
		expect(createCombinations(secArr, filter).length).toBe(0);
	})

	it("Times", function() {
		let filter = new Filter();
		filter.add((s) => isValidTime(s, 34800, MAX_TIME));

		/*
		We have 64 possible combinations altogether.
		There are 4 sections that overlap (2 with each other), so that's -4
		Also, each section overlaps with itself (8) BUT not the online one (so 7)
		64 - 4 - 7 = 53
		 */
		expect(createCombinations(secArr, filter).length).toBe(53);

		filter = new Filter();
		filter.add((s) => isValidTime(s, MIN_TIME, 62100));

		/*
		64 - 4 - 7 = 52
		 */
		expect(createCombinations(secArr, filter).length).toBe(53);
	})

	it("Seats remaining", function() {
		let filter = new Filter();
		filter.add(isSeatsLeft);

		// Filters out 2, so: 49 - 7 - 2
		// We only have the 2 courses overlaping each other

		expect(createCombinations(secArr, filter).length).toBe(40);
	})

	it("Days off", function() {
		let filter = new Filter();
		filter.add((s) => enoughDaysOff(s, 4, []));

		expect(createCombinations(secArr, filter).length).toBe(69);

		filter = new Filter();
		filter.add((s) => enoughDaysOff(s, 2, ["2"]));

		// We only have one section with tuesday off -- the online one
		expect(createCombinations(secArr, filter).length).toBe(1);
	})


})