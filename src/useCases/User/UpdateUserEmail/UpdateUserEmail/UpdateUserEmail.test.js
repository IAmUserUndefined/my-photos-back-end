/* eslint-disable no-undef */

jest.setTimeout(15000);

const { UserTestRepository } = require("../../../../repositories/User/UserTestRepository/UserTestRepository");

const userTestRepository = new UserTestRepository();

const request = require("supertest");

const app = require("../../../../app");

describe("Update email", () => {

	beforeAll(async () => {

		await userTestRepository.createTestUsers();
    
	});

	afterAll(async () => {
		await userTestRepository.deleteTestUsers();
	});

	test("Should not update email, because the email field is empty", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/update-email")
			.set("Authorization", `Bearer ${token.body.response}`)
			.query({
				email: "",
				verificationToken: "544f818f5f5cd4cde44c611683fc71"
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not update email, because the verification token field is empty", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/update-email")
			.set("Authorization", `Bearer ${token.body.response}`)
			.query({
				email: "joao2000@teste.com",
				verificationToken: ""
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not update email, because all fields are empty", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/update-email")
			.set("Authorization", `Bearer ${token.body.response}`)
			.query({
				email: "",
				verificationToken: ""
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not update email, because the verification token is incorrect", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/update-email")
			.set("Authorization", `Bearer ${token.body.response}`)
			.query({
				email: "joao2000@teste.com",
				verificationToken: "544f818f5f5cd4cde44c611683fc72"
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Token Inválido");
	});

	test("Should not update email, because the update email link was expired", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao5000@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/update-email")
			.set("Authorization", `Bearer ${token.body.response}`)
			.query({
				email: "joao2000@teste.com",
				verificationToken: "544f818f5f5cd4cde44c611683fc71"
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Link expirado, recomece o processo");
	});

	test("Should update email", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/update-email")
			.set("Authorization", `Bearer ${token.body.response}`)
			.query({
				email: "joao2000@teste.com",
				verificationToken: "544f818f5f5cd4cde44c611683fc71"
			});

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("Email atualizado com sucesso");
	});
});