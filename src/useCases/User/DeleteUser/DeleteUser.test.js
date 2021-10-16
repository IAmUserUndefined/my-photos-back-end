/* eslint-disable no-undef */

jest.setTimeout(15000);

const { UserTestRepository } = require("../../../repositories/User");

const userTestRepository = new UserTestRepository();

const request = require("supertest");

const app = require("../../../app");

describe("Delete User", () => {

	beforeAll(async () => {

		await userTestRepository.createTestUsers();
    
	});

	afterAll(async () => {
		await userTestRepository.deleteTestUsers();
	});

	test("Should not delete user, because the password field is empty", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.delete("/user/delete")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				password: "Corinthians1910",
				passwordConfirm: "",
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not delete user, because the password confirm field is empty", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.delete("/user/delete")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				password: "",
				passwordConfirm: "Corinthians1910",
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not delete user, because all fields is empty", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.delete("/user/delete")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				password: "",
				passwordConfirm: "",
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha todos os campos");
	});

	test("Should not delete user, because the password is incorrect", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.delete("/user/delete")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				password: "Corinth",
				passwordConfirm: "Corinth",
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("A sua senha está incorreta");
	});

	test("Should delete user", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.delete("/user/delete")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				password: "Corinthians1910",
				passwordConfirm: "Corinthians1910",
			});

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("Usuário excluído com sucesso");
	});
});