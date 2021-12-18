/* eslint-disable no-undef */

jest.setTimeout(15000);

const { UserTestRepository } = require("../../../repositories/User/UserTestRepository/UserTestRepository");

const userTestRepository = new UserTestRepository();

const request = require("supertest");

const app = require("../../../app");

describe("Update password", () => {

	beforeAll(async () => {

		await userTestRepository.createTestUsers();
    
	});

	afterAll(async () => {
		await userTestRepository.deleteTestUsers();
	});

	test("Should not update password, because the password field is empty", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				passwordCurrent: "",
				newPassword: "Corinthians2012",
				newPasswordConfirm: "Corinthians2012",
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not update password, because the password confirm field is empty", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				passwordCurrent: "Corinthians1910",
				newPassword: "",
				newPasswordConfirm: "Corinthians2012",
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not update password, because the password new confirm field is empty", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				passwordCurrent: "Corinthians1910",
				newPassword: "Corinthians2012",
				newPasswordConfirm: "",
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not update password, because all fields are empty", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				passwordCurrent: "",
				newPassword: "",
				newPasswordConfirm: "",
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not update password, because the passwords is not match", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				passwordCurrent: "Corinthians1910",
				newPassword: "Corinthians2012",
				newPasswordConfirm: "Corinthians201",
			});


		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("As senhas não coincidem");
	});

	test("Should update password", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				passwordCurrent: "Corinthians1910",
				newPassword: "Corinthians2012",
				newPasswordConfirm: "Corinthians2012",
			});


		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("Senha atualizada com sucesso");
	});
});