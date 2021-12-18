/* eslint-disable no-undef */

const request = require("supertest");

const app = require("../../app");

describe("Adapter routers middlewares", () => {

	test("Should return a unauthorized error", async () => {

		const response = await request(app)
			.get("/middleware-unathorized");

		expect(response.body.response).toBe("Token Inválido");
		expect(response.status).toBe(401);
	});

	test("Should return the user id", async () => {

		const response = await request(app)
			.get("/middleware-userid")
			.set("Authorization", "Bearer userId");

		expect(response.body.response).toBe("userId");
		expect(response.status).toBe(200);
	});

});