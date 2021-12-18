/* eslint-disable no-undef */

const { UserTestRepository } = require("./UserTestRepository");

describe(("Test of user repository"), () => {

	test("Should create test user", async () => {
		const repository = new UserTestRepository();
		await repository.createTestUsers();
	});

	test("Should remove test user", async () => {
		const repository = new UserTestRepository();
		await repository.deleteTestUsers();
	});

});