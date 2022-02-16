/* eslint-disable no-undef */

jest.setTimeout(15000);

const { VideoTestRepository } = require("../../../repositories/Video/VideoTestRepository/VideoTestRepository");

const videoTestRepository = new VideoTestRepository();

const request = require("supertest");

const app = require("../../../app");

const Helper = require("../../../utils/helper/Helper");

const path = require("path");

describe("Add Video", () => {

	beforeAll(async () => {

		await videoTestRepository.createTestUser();

	});

	afterAll(async () => {

		const key = await videoTestRepository.getVideoKey();

		Helper.deleteFile(key);

		await videoTestRepository.removeVideoAndUserTest();

	});

	test("Should add the video", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.post("/video")
			.set("Authorization", `Bearer ${token.body.response}`)
			.attach("file", path.resolve(__dirname, "..", "..", "..", "utils", "tmp", "test", "video.mp4"));

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("Vídeo adicionado com sucesso");

	});
});