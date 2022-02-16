/* eslint-disable no-undef */

const { UserRepository } = require("../../User/UserRepository/UserRepository");
const { VideoRepository } = require("./VideoRepository");

describe(("Test of photo repository"), () => {

	beforeAll(async () => {
		const repository = new UserRepository();
		await repository.create("1", "email@teste.com", "Teste123", "abc-123-456");
	});

	afterAll(async () => {
		const repository = new UserRepository();
		await repository.delete("1");
	});

	test("Should create video", async () => {
		const repository = new VideoRepository();
		await repository.create("1", "1", "https://video/1", "video.mp4", "12315649415619-video.mp4");
	});

	test("Should get videos", async () => {
		const repository = new VideoRepository();
		const photos = await repository.getVideos("1", "1");
		expect(photos[0].id).toBe("1");
		expect(photos[0].name).toBe("video.mp4");
		expect(photos[0].key).toBe("12315649415619-video.mp4");
		expect(photos[0].url).toBe("https://video/1");
	});

	test("Should remove video", async () => {
		const repository = new VideoRepository();
		await repository.remove("1", "1");
	});
});