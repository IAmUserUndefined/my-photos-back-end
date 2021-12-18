/* eslint-disable no-undef */

jest.setTimeout(15000);

const { PhotoTestRepository } = require("../../../repositories/Photo/PhotoTestRepository/PhotoTestRepository");

const photoTestRepository = new PhotoTestRepository();

const request = require("supertest");

const app = require("../../../app");

const Helper = require("../../../utils/helper/Helper");

const path = require("path");

describe("Get Photo", () => {

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

		const key = await photoTestRepository.getPhotoKey();

		Helper.deleteFile(key);

		await photoTestRepository.removePhotoAndUserTest();

	});
	test("Should get the photo", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.get("/photo")
			.set("Authorization", `Bearer ${token.body.response}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.response[0].id).not.toBeUndefined();
		expect(response.body.response[0].name).not.toBeUndefined();
		expect(response.body.response[0].key).not.toBeUndefined();

	});
});