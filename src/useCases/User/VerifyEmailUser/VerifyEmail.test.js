/* eslint-disable no-undef */

jest.setTimeout(15000);

const { UserTestRepository } = require("../../../repositories/User/UserTestRepository/UserTestRepository");

const userTestRepository = new UserTestRepository();

const request = require("supertest");

const app = require("../../../app");

describe("Verify Email", () => {

	beforeAll(async () => {

		await userTestRepository.createTestUsers();
    
	});

	afterAll(async () => {
		await userTestRepository.deleteTestUsers();
	});

	test("Should not verify email, because the email field is empty", async () => {

		const response = await request(app)
			.post("/verify-email")
			.query({
				email: "",
				token: "87d1657283d5bbd7db3cf4d2395d52"
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not verify email, because the token field is empty", async () => {

		const response = await request(app)
			.post("/verify-email")
			.query({
				email: "joao1000@teste.com",
				token: ""
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not verify email, because all fields are empty", async () => {

		const response = await request(app)
			.post("/verify-email")
			.query({
				email: "",
				token: ""
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not verify email, because the email alredy was verified", async () => {

		const response = await request(app)
			.post("/verify-email")
			.query({
				email: "joao@teste.com",
				token: "87d1657283d5bbd7db3cf4d2395d53"
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Email já verificado");
	});

	test("Should not verify email, because the token is incorrect", async () => {

		const response = await request(app)
			.post("/verify-email")
			.query({
				email: "joao1000@teste.com",
				token: "87d1657283d5bbd7db3cf4584fdad"
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Token inválido");
	});

	test("Should the verify email", async () => {

		const response = await request(app)
			.post("/verify-email")
			.query({
				email: "joao1000@teste.com",
				token: "216d685d384626d9a575629dc38e88"
			});

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("Email verificado com sucesso");
	});
});