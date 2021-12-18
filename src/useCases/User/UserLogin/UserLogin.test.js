/* eslint-disable no-undef */

jest.setTimeout(15000);

const { UserTestRepository } = require("../../../repositories/User/UserTestRepository/UserTestRepository");

const userTestRepository = new UserTestRepository();

const request = require("supertest");

const app = require("../../../app");

describe("User login", () => {

	beforeAll(async () => {

		await userTestRepository.createTestUsers();
    
	});

	afterAll(async () => {
		await userTestRepository.deleteTestUsers();
	});

	test("Should not return the token, because the email field is empty", async () => {

		const response = await request(app)
			.post("/user/login")
			.send({
				email: "",
				password: "Corinthians1910"
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not return the token, because the password field is empty", async () => {

		const response = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: ""
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not return the token, because all fields are empty", async () => {

		const response = await request(app)
			.post("/user/login")
			.send({
				email: "",
				password: ""
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not return the token, because the email is incorrect", async () => {

		const response = await request(app)
			.post("/user/login")
			.send({
				email: "joao100@teste.com",
				password: "Corinthians1910"
			});

		expect(response.statusCode).toBe(401);
		expect(response.body.response).toBe("Email/Senha Incorreto(s)");

	});

	test("Should not return the token, because the email was not verified", async () => {

		const response = await request(app)
			.post("/user/login")
			.send({
				email: "joao1000@teste.com",
				password: "Corinthians1910"
			});

		expect(response.statusCode).toBe(401);
		expect(response.body.response).toBe("Email não verificado");

	});

	test("Should not return the token, because the password is incorrect", async () => {

		const response = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians2012"
			});

		expect(response.statusCode).toBe(401);
		expect(response.body.response).toBe("Email/Senha Incorreto(s)");

	});

	test("Should return the token", async () => {

		const response = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		expect(response.statusCode).toBe(200);
		expect(response.body.response).not.toBeUndefined();

	});

});