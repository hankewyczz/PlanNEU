// Testing handleUserInput
describe("Handle parsing the user input for a single course", function() {

	it("Valid input, mixed spaces", async function() {
		var out = await handleUserInput("fina 2319 ");
		expect(out[0]).toBe("FINA");
		expect(out[1]).toBe("2319");

		var out1 = await handleUserInput(" FINA2319 ");
		expect(out1[0]).toBe(out[0]);
		expect(out1[1]).toBe(out[1]);

		var out2 = await handleUserInput(" fina 2 3 1 9 ");
		expect(out2[0]).toBe(out[0]);
		expect(out2[1]).toBe(out[1]);
	})


	it("Invalid input, invalid subject", async function() {
		try {
			await handleUserInput("test.1234");
			fail();
		} catch(e) {
			// Success
		}
		try {
			await handleUserInput("hist-1234");
			fail();
		} catch(e) {
			// Success
		}
		try {
			await handleUserInput("cs/cy 1234");
			fail();
		} catch(e) {
			// Success
		}
		try {
			await handleUserInput("Object Orientehistd Design: cs3500");
			fail();
		} catch(e) {
			// Success
		}
		try {
			await handleUserInput("c0mputerscience 1234");
			fail();
		} catch(e) {
			// Success
		}
		try {
			await handleUserInput("12345");
			fail();
		} catch(e) {
			// Success
		}
		try {
			await handleUserInput("УКР 1234");
			fail();
		} catch(e) {
			// Success
		}
		try {
			await handleUserInput("accounting - 1210");
			fail();
		} catch(e) {
			// So jasmine doesn't complain about us having no expects
			expect(true).toBe(true);
		}
	})
});