/* eslint-disable no-undef */

jest.setTimeout(15000);

const { PhotoTestRepository } = require("../../../repositories/Photo/PhotoTestRepository/PhotoTestRepository");

const photoTestRepository = new PhotoTestRepository();

const request = require("supertest");

const app = require("../../../app");

const path = require("path");

describe("Remove Photo", () => {

	beforeAll(async () => {

		await photoTestRepository.createTestUser();

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		await request(app)
			.post("/photo")
			.set("Authorization", `Bearer ${token.body.response}`)
			.attach("file", path.resolve(__dirname, "..", "..", "..", "utils", "tmp", "test", "corinthians.jpg"));
	});

	afterAll(async () => {

		await photoTestRepository.removePhotoAndUserTest();

	});

	test("Should remove the photo", async () => {

		const dataValues = await photoTestRepository.getIdAndKey();

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.delete(`/photo/${dataValues.id}/${dataValues.key}`)
			.set("Authorization", `Bearer ${token.body.response}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("Foto excluída com sucesso");

	});
});