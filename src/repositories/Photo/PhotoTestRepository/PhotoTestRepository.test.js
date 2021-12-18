/* eslint-disable no-undef */

const { PhotoTestRepository } = require("./PhotoTestRepository");

describe(("Test of photo repository"), () => {

	test("Should create test photo", async () => {
		const repository = new PhotoTestRepository();
		await repository.createTestUser();
	});

	test("Should remove test photo", async () => {
		const repository = new PhotoTestRepository();
		await repository.removePhotoAndUserTest();
	});

});