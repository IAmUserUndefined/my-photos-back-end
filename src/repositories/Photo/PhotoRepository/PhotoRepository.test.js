/* eslint-disable no-undef */

const { UserRepository } = require("../../User/UserRepository/UserRepository");
const { PhotoRepository } = require("./PhotoRepository");

describe(("Test of photo repository"), () => {

	beforeAll(async () => {
		const repository = new UserRepository();
		await repository.create("1", "email@teste.com", "Teste123", "abc-123-456");
	});

	afterAll(async () => {
		const repository = new UserRepository();
		await repository.delete("1");
	});

	test("Should create photo", async () => {
		const repository = new PhotoRepository();
		await repository.create("1", "1", "https://photo/1", "corinthians.jpg", "12315649415619-corinthians.jpg");
	});

	test("Should get photos", async () => {
		const repository = new PhotoRepository();
		const photos = await repository.getPhotos("1", "1");
		expect(photos[0].id).toBe("1");
		expect(photos[0].name).toBe("corinthians.jpg");
		expect(photos[0].key).toBe("12315649415619-corinthians.jpg");
		expect(photos[0].url).toBe("https://photo/1");
	});

	test("Should remove photo", async () => {
		const repository = new PhotoRepository();
		await repository.remove("1", "1");
	});
});