/* eslint-disable no-undef */

jest.setTimeout(15000);

const { UserTestRepository } = require("../../../../repositories/User/UserTestRepository/UserTestRepository");

const userTestRepository = new UserTestRepository();

const request = require("supertest");

const app = require("../../../../app");

describe("Send update email link", () => {

	beforeAll(async () => {

		await userTestRepository.createTestUsers();
    
	});

	afterAll(async () => {
		await userTestRepository.deleteTestUsers();
	});

	test("Should not send email update link, because the email field is empty", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.post("/user/email/send-token-update-email")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				email: ""
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha o campo email");
	});

	test("Should not send email update link, because the email alredy was registered", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.post("/user/email/send-token-update-email")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				email: "joao5000@teste.com"
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Email já cadastrado");
	});

	test("Should send email update link", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.post("/user/email/send-token-update-email")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				email: "joao7000@teste.com"
			});

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("O link de atualização de email foi enviado para seu email, ele é válido por alguns minutos");
	});
});