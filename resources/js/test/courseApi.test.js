// Tests getCourseFromApi
describe("Fetching data from SearchNEU", function() {
	it("Is API working (Spring, 2021)", async function() {
		let cs3500 = new Course("CS", "3500", SEMESTER);

		// Initial
		expect(cs3500.alreadySaved()).toBe(false);
		// Actually get the class this time
		
		var response = await getCourseFromApi(cs3500);
		// Same call as the first time, but now we've gotten the class before
		expect(cs3500.alreadySaved()).toBe(true); 
	})
})
