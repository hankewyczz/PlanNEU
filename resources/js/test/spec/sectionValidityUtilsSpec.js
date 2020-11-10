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
			"results": [
				{
					"class": {
						"classAttributes": [
							"Computer&Info Sci  UBCS"
						],
						"classId": "2511",
						"coreqs": {
							"type": "and",
							"values": [
								{
									"classId": "2510",
									"subject": "CS"
								}
							]
						},
						"description": "Accompanies CS 2510. Covers topics from the course through various experiments.",
						"feeAmount": null,
						"feeDescription": "",
						"host": "neu.edu",
						"id": "neu.edu/202130/CS/2511",
						"lastUpdateTime": 1604892187433,
						"maxCredits": 1,
						"minCredits": 1,
						"name": "Lab for CS 2510",
						"nupath": [],
						"optPrereqsFor": {
							"values": []
						},
						"prereqs": {
							"type": "and",
							"values": []
						},
						"prereqsFor": {
							"values": []
						},
						"prettyUrl": "https://wl11gp.neu.edu/udcprod8/bwckctlg.p_disp_course_detail?cat_term_in=202130&subj_code_in=CS&crse_numb_in=2511",
						"subject": "CS",
						"termId": "202130",
						"url": "https://wl11gp.neu.edu/udcprod8/bwckctlg.p_disp_listcrse?term_in=202130&subj_in=CS&crse_in=2511&schd_in=%",
						"desc": "Accompanies CS 2510. Covers topics from the course through various experiments."
					},
					"sections": [
						{
							"classType": "Lab",
							"crn": "30227",
							"honors": false,
							"info": "",
							"meetings": [
								{
									"type": "Class",
									"times": {
										"2": [
											{
												"end": 34800,
												"start": 28800
											}
										]
									},
									"where": "TBA",
									"endDate": 18738,
									"startDate": 18646
								}
							],
							"online": false,
							"profs": [
								"Leena Razzaq"
							],
							"seatsCapacity": 101,
							"seatsRemaining": 101,
							"url": "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202130&crn_in=30227",
							"waitCapacity": 0,
							"waitRemaining": 0,
							"lastUpdateTime": 1604892187433,
							"termId": "202130",
							"host": "neu.edu",
							"subject": "CS",
							"classId": "2511"
						},
						{
							"classType": "Lab",
							"crn": "31270",
							"honors": false,
							"info": "",
							"meetings": [
								{
									"type": "Class",
									"times": {
										"2": [
											{
												"end": 41400,
												"start": 35400
											}
										]
									},
									"where": "TBA",
									"endDate": 18738,
									"startDate": 18646
								}
							],
							"online": false,
							"profs": [
								"Benjamin Lerner"
							],
							"seatsCapacity": 101,
							"seatsRemaining": 100,
							"url": "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202130&crn_in=31270",
							"waitCapacity": 0,
							"waitRemaining": 0,
							"lastUpdateTime": 1604892187433,
							"termId": "202130",
							"host": "neu.edu",
							"subject": "CS",
							"classId": "2511"
						},
						{
							"classType": "Lab",
							"crn": "31403",
							"honors": false,
							"info": "",
							"meetings": [
								{
									"type": "Class",
									"times": {
										"2": [
											{
												"end": 41400,
												"start": 35400
											}
										]
									},
									"where": "TBA",
									"endDate": 18738,
									"startDate": 18646
								}
							],
							"online": false,
							"profs": [
								"Leena Razzaq"
							],
							"seatsCapacity": 101,
							"seatsRemaining": 99,
							"url": "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202130&crn_in=31403",
							"waitCapacity": 0,
							"waitRemaining": 0,
							"lastUpdateTime": 1604892187433,
							"termId": "202130",
							"host": "neu.edu",
							"subject": "CS",
							"classId": "2511"
						},
						{
							"classType": "Lab",
							"crn": "32353",
							"honors": false,
							"info": "",
							"meetings": [
								{
									"type": "Class",
									"times": {
										"2": [
											{
												"end": 48300,
												"start": 42300
											}
										]
									},
									"where": "TBA",
									"endDate": 18738,
									"startDate": 18646
								}
							],
							"online": false,
							"profs": [
								"Leena Razzaq"
							],
							"seatsCapacity": 101,
							"seatsRemaining": 101,
							"url": "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202130&crn_in=32353",
							"waitCapacity": 0,
							"waitRemaining": 0,
							"lastUpdateTime": 1604892187433,
							"termId": "202130",
							"host": "neu.edu",
							"subject": "CS",
							"classId": "2511"
						},
						{
							"classType": "Lab",
							"crn": "32354",
							"honors": false,
							"info": "",
							"meetings": [
								{
									"type": "Class",
									"times": {
										"2": [
											{
												"end": 48300,
												"start": 42300
											}
										]
									},
									"where": "TBA",
									"endDate": 18738,
									"startDate": 18646
								}
							],
							"online": false,
							"profs": [
								"Leena Razzaq"
							],
							"seatsCapacity": 101,
							"seatsRemaining": 101,
							"url": "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202130&crn_in=32354",
							"waitCapacity": 0,
							"waitRemaining": 0,
							"lastUpdateTime": 1604892187433,
							"termId": "202130",
							"host": "neu.edu",
							"subject": "CS",
							"classId": "2511"
						},
						{
							"classType": "Lab",
							"crn": "33095",
							"honors": false,
							"info": "",
							"meetings": [
								{
									"type": "Class",
									"times": {
										"2": [
											{
												"end": 54900,
												"start": 48900
											}
										]
									},
									"where": "TBA",
									"endDate": 18738,
									"startDate": 18646
								}
							],
							"online": false,
							"profs": [
								"Leena Razzaq"
							],
							"seatsCapacity": 101,
							"seatsRemaining": 97,
							"url": "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202130&crn_in=33095",
							"waitCapacity": 0,
							"waitRemaining": 0,
							"lastUpdateTime": 1604892187433,
							"termId": "202130",
							"host": "neu.edu",
							"subject": "CS",
							"classId": "2511"
						},
						{
							"classType": "Lab",
							"crn": "33096",
							"honors": false,
							"info": "",
							"meetings": [
								{
									"type": "Class",
									"times": {
										"2": [
											{
												"end": 61500,
												"start": 55500
											}
										]
									},
									"where": "TBA",
									"endDate": 18738,
									"startDate": 18646
								}
							],
							"online": false,
							"profs": [
								"Leena Razzaq"
							],
							"seatsCapacity": 101,
							"seatsRemaining": 100,
							"url": "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202130&crn_in=33096",
							"waitCapacity": 0,
							"waitRemaining": 0,
							"lastUpdateTime": 1604892187433,
							"termId": "202130",
							"host": "neu.edu",
							"subject": "CS",
							"classId": "2511"
						},
						{
							"classType": "Lab",
							"crn": "33619",
							"honors": false,
							"info": "",
							"meetings": [
								{
									"type": "Class",
									"times": {
										"2": [
											{
												"end": 68100,
												"start": 62100
											}
										]
									},
									"where": "TBA",
									"endDate": 18738,
									"startDate": 18646
								}
							],
							"online": false,
							"profs": [
								"Leena Razzaq"
							],
							"seatsCapacity": 101,
							"seatsRemaining": 101,
							"url": "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202130&crn_in=33619",
							"waitCapacity": 0,
							"waitRemaining": 0,
							"lastUpdateTime": 1604892187433,
							"termId": "202130",
							"host": "neu.edu",
							"subject": "CS",
							"classId": "2511"
						},
						{
							"classType": "Lab",
							"crn": "37309",
							"honors": false,
							"info": "",
							"meetings": [
								{
									"type": "Class",
									"times": {},
									"where": "TBA",
									"endDate": 18738,
									"startDate": 18646
								}
							],
							"online": true,
							"profs": [
								"Vidoje Mihajlovikj"
							],
							"seatsCapacity": 100,
							"seatsRemaining": 98,
							"url": "https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_detail_sched?term_in=202130&crn_in=37309",
							"waitCapacity": 0,
							"waitRemaining": 0,
							"lastUpdateTime": 1604892187433,
							"termId": "202130",
							"host": "neu.edu",
							"subject": "CS",
							"classId": "2511"
						}
					],
					"type": "class"
				}
			],
			"filterOptions": {
				"nupath": [],
				"subject": [
					{
						"value": "CS",
						"count": 1
					}
				],
				"classType": [
					{
						"value": "Lab",
						"count": 1
					}
				]
			}
		};



		cs2511 = new Course("CS", "2511", "202130");
		saveCourse(cs2511, cs2511Content);

		cs2511Secs = cs2511.sections();
	});


	it("CS2511", function() {
		let secContent = {
			"meetings": [{
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

		let fakeSec = new Section("12345", "CS2500", secContent);


		let counter = 0;

		for (let i = 0; i < cs2511Secs.length; i++) {
			counter += sectionsOverlap(fakeSec, cs2511Secs[i]) ? 1 : 0;
		}

		expect(counter).toBe(2);

		//42300  to 48300 
		// cs2511Secs

	});
})