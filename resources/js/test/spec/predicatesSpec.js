describe("meetsMinHonorsReq", function() {
	let cs2511Content = {
		"results": [{
			"sections":
				[{ "crn": 1234, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 34800, "start": 28800 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "honors": false, "meetings": [{ "type": "Class","times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "honors": true, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 54900, "start": 48900 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 61500, "start": 55500 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 68100, "start": 62100 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "honors": false, "meetings": [{ "type": "Class", "times": {}, "where": "TBA", "endDate": 18738, "startDate": 18646 }] }]
		}]
	};

	let cs2511 = new Course("CS", "2511", "202130");
	saveCourse(cs2511, cs2511Content);

	let cs2511Secs = cs2511.sections();

	it("Empty sections case", function() {
		expect(meetsMinHonorsReq([])).toBe(true);
		expect(meetsMinHonorsReq([], 2)).toBe(true);
	})

	it("Zero honors case", function() {
		expect(meetsMinHonorsReq(cs2511Secs)).toBe(true);
		expect(meetsMinHonorsReq(cs2511Secs, 0)).toBe(true);
	})

	it("One case", function() {
		expect(meetsMinHonorsReq(cs2511Secs, 1)).toBe(true);
	})

	it("Too many honors", function() {
		expect(meetsMinHonorsReq(cs2511Secs, 2)).toBe(false);
		expect(meetsMinHonorsReq(cs2511Secs, 200)).toBe(false);
	})


})


describe("isValidTime", function() {
	let cs2511Content = {
		"results": [{
			"sections":
				[
				{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 34800, "start": 28800 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "seatsRemaining": 10, "honors": true, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 54900, "start": 48900 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 61500, "start": 55500 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 68100, "start": 62100 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
				{ "seatsRemaining": 0, "honors": false, "meetings": [{ "type": "Class", "times": {}, "where": "TBA", "endDate": 18738, "startDate": 18646 }] }]
		}]
	};

	let cs2511 = new Course("CS", "2511", "202130");
	saveCourse(cs2511, cs2511Content);

	let cs2511Secs = cs2511.sections();

	it("Empty case", function() {
		expect(isValidTime(cs2511Secs)).toBe(true);
		expect(isValidTime(cs2511Secs, MIN_TIME, MAX_TIME)).toBe(true);
	})

	it("All valid", function() {
		expect(isValidTime(cs2511Secs, 1, MAX_TIME)).toBe(true);
		expect(isValidTime(cs2511Secs, 28800, MAX_TIME)).toBe(true);
		expect(isValidTime(cs2511Secs, 28800, 68100)).toBe(true);
	})

	it("Invalid", function() {
		expect(isValidTime(cs2511Secs, 35401, MAX_TIME)).toBe(false);
		expect(isValidTime(cs2511Secs, MIN_TIME, 68099)).toBe(false);
		expect(isValidTime(cs2511Secs, 2, 1)).toBe(false);
	})

})

describe("isSeatsLeft", function() {
	let cs2511Content = {
		"results": [{
			"sections":
				[
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 34800, "start": 28800 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": true, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 54900, "start": 48900 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 61500, "start": 55500 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 68100, "start": 62100 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 0, "honors": false, "meetings": [{ "type": "Class", "times": {}, "where": "TBA", "endDate": 18738, "startDate": 18646 }] }]
		}]
	};

	let cs2511 = new Course("CS", "2511", "202130");
	saveCourse(cs2511, cs2511Content);

	let cs2511Secs = cs2511.sections();

	it("Any seats left?", function() {
		expect(isSeatsLeft(cs2511Secs)).toBe(false);
	})
})



describe("Enough days off?", function() {
	let cs2511Content = {
		"results": [{
			"sections":
				[
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 34800, "start": 28800 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 41400, "start": 35400 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": true, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 48300, "start": 42300 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 54900, "start": 48900 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 61500, "start": 55500 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 10, "honors": false, "meetings": [{ "type": "Class", "times": { "2": [{ "end": 68100, "start": 62100 }] }, "where": "TBA", "endDate": 18738, "startDate": 18646 }] },
					{ "seatsRemaining": 0, "honors": false, "meetings": [{ "type": "Class", "times": {}, "where": "TBA", "endDate": 18738, "startDate": 18646 }] }]
		}]
	};

	let cs2511 = new Course("CS", "2511", "202130");
	saveCourse(cs2511, cs2511Content);

	let cs2511Secs = cs2511.sections();


	it("Empty", function() {
		expect(enoughDaysOff(cs2511Secs)).toBe(true);
		expect(enoughDaysOff(cs2511Secs, 0, [])).toBe(true);
	})

	it ("Invalid days off combination", function() {
		expect(enoughDaysOff(cs2511Secs, 0, ["1"])).toBe(false);
	})

	it("No specific days", function() {
		expect(enoughDaysOff(cs2511Secs, 4)).toBe(true);
		expect(enoughDaysOff(cs2511Secs, 4, [])).toBe(true);
	})

	it("Specific days", function() {
		expect(enoughDaysOff(cs2511Secs, 4, ["1", "3", "4"])).toBe(true);
		expect(enoughDaysOff(cs2511Secs, 4, ["1", "3", "4", "5"])).toBe(true);
	})

	it("Not enough days", function() {
		expect(enoughDaysOff(cs2511Secs, 5)).toBe(false);
		expect(enoughDaysOff(cs2511Secs, 1, ["2"])).toBe(false);
		expect(enoughDaysOff(cs2511Secs, 3, ["2"])).toBe(false);
	})


})