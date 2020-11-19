beforeEach(function() {
	USER_SECTIONS = {};
})

describe("Section Utils", function() {
	it("Creating a Section", function() {
		let content = { "crn": "123", 
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
					[{ "crn": 1234, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 34800, "start": 28800 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "honors": true, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 54900, "start": 48900 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 61500, "start": 55500 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 68100, "start": 62100 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "honors": false, "meetings": [{ "type": "Class", "times": {}, "where": "TBA", "endDate": 18738, "startDate": 18646 }] }]
			}]
		};



		cs2511 = new Course("CS", "2511", "202130");
		saveCourse(cs2511, cs2511Content);

		cs2511Secs = cs2511.sections();
	});


	it("CS2511", function() {
		let secContent = {
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



describe("odometerIncrement", function() {
	it("Empty", function() {
		expect(odometerIncrement([], [])).toBe(false);
	})

	it("Basic", function() {
		let indices = [0, 0, 0]
		let arrayOfArrays = [[1, 2], [1], [2, 3, 4]]

		expect(indices).toEqual([0, 0, 0])
		expect(odometerIncrement(indices, arrayOfArrays)).toBe(true);
		expect(indices).toEqual([0, 0, 1])
		expect(odometerIncrement(indices, arrayOfArrays)).toBe(true);
		expect(indices).toEqual([0, 0, 2])
		expect(odometerIncrement(indices, arrayOfArrays)).toBe(true);
		expect(indices).toEqual([1, 0, 0])
		expect(odometerIncrement(indices, arrayOfArrays)).toBe(true);
		expect(indices).toEqual([1, 0, 1])
		expect(odometerIncrement(indices, arrayOfArrays)).toBe(true);
		expect(indices).toEqual([1, 0, 2])
		expect(odometerIncrement(indices, arrayOfArrays)).toBe(false);
	})
})


describe("formCombination", function() {
	it("Empty case", function() {
		expect(formCombination([], [])).toEqual([]);
	})


	it("Basic", function() {
		let indices = [2, 2, 0]
		let arrayOfArrays = [[1, 2, 3], [1, 2, 3], [1, 2, 3]]

		expect(formCombination(indices, arrayOfArrays)).toEqual([3, 3, 1]);
		odometerIncrement(indices, arrayOfArrays);
		expect(formCombination(indices, arrayOfArrays)).toEqual([3, 3, 2]);
		odometerIncrement(indices, arrayOfArrays);
		expect(formCombination(indices, arrayOfArrays)).toEqual([3, 3, 3]);
		expect(odometerIncrement(indices, arrayOfArrays)).toBe(false);
		expect(formCombination(indices, arrayOfArrays)).toEqual([3, 1, 1]);
	})
})
