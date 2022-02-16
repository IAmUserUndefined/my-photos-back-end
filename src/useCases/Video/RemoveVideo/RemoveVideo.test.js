/* eslint-disable no-undef */

jest.setTimeout(15000);

const { VideoTestRepository } = require("../../../repositories/Video/VideoTestRepository/VideoTestRepository");

const videoTestRepository = new VideoTestRepository();

const request = require("supertest");

const app = require("../../../app");

const path = require("path");

describe("Remove Video", () => {

	beforeAll(async () => {

		await videoTestRepository.createTestUser();

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		await request(app)
			.post("/video")
			.set("Authorization", `Bearer ${token.body.response}`)
			.attach("file", path.resolve(__dirname, "..", "..", "..", "utils", "tmp", "test", "video.mp4"));
	});

	afterAll(async () => {

		await videoTestRepository.removeVideoAndUserTest();

	});

	test("Should remove the video", async () => {

		const dataValues = await videoTestRepository.getIdAndKey();

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.delete(`/video/${dataValues.id}/${dataValues.key}`)
			.set("Authorization", `Bearer ${token.body.response}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("Vídeo excluído com sucesso");

	});
});