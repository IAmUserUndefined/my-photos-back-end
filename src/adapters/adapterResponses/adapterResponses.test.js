/* eslint-disable no-undef */

jest.setTimeout(15000);

const { ok } = require("./adapterResponses");

describe("Adapter responses test", () => {

	test("Should return a object with two attributes, the response and the status code", async () => {

		const { statusCode, response } = await ok("Response");

		expect(response).toBe("Response");
		expect(statusCode).toBe(200);

	});
});