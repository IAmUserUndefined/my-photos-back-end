/* eslint-disable no-undef */

const { VideoTestRepository } = require("./VideoTestRepository");

describe(("Test of video repository"), () => {

	test("Should create video test", async () => {
		const repository = new VideoTestRepository();
		await repository.createTestUser();
	});

	test("Should remove video test", async () => {
		const repository = new VideoTestRepository();
		await repository.removeVideoAndUserTest();
	});

});