/* eslint-disable no-undef */

jest.setTimeout(15000);

const { UserTestRepository } = require("../../../../repositories/User/UserTestRepository/UserTestRepository");

const userTestRepository = new UserTestRepository();

const request = require("supertest");

const app = require("../../../../app");

describe("Send recovery password link", () => {

	beforeAll(async () => {

		await userTestRepository.createTestUsers();
    
	});

	afterAll(async () => {
		await userTestRepository.deleteTestUsers();
	});

	test("Should not send the recovery password email, because the email field is empty", async () => {

		const response = await request(app)
			.post("/user/password/send-token-password-recover")
			.send({
				email: ""
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha o campo email");
	});

	test("Should not send the recovery password email, because the email is not registered", async () => {

		const response = await request(app)
			.post("/user/password/send-token-password-recover")
			.send({
				email: "joao8000@teste.com"
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Email não cadastrado");
	});

	test("Should send the recovery password email", async () => {

		const response = await request(app)
			.post("/user/password/send-token-password-recover")
			.send({
				email: "joao@teste.com"
			});

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("O link de recuperação de senha foi enviado para seu email, ele é válido por alguns minutos, não esqueça de verificar sua caixa de spam");
	});
});