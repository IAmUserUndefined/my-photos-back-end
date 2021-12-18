/* eslint-disable no-undef */

const { UserRepository } = require("./UserRepository");

describe(("Test of user repository"), () => {

	test("Should create user", async () => {
		const repository = new UserRepository();
		await repository.create("1", "email@teste.com", "Teste123", "abc-123-456");
	});

	test("Should verify user", async () => {
		const repository = new UserRepository();
		await repository.verifyEmail("email@teste.com", "abc-123-456");
	});

	test("Should return email by id", async () => {
		const repository = new UserRepository();
		const email = await repository.findEmailById("1");
		expect(email.email).toBe("email@teste.com");
	});

	test("Should return email by email", async () => {
		const repository = new UserRepository();
		const email = await repository.findEmailByEmail("email@teste.com");
		expect(email.email).toBe("email@teste.com");
	});

	test("Should return id", async () => {
		const repository = new UserRepository();
		const id = await repository.getId("email@teste.com");
		expect(id).toBe("1");
	});

	test("Should return password by id", async () => {
		const repository = new UserRepository();
		const email = await repository.getPasswordById("1");
		expect(email).toBe("Teste123");
	});

	test("Should return password by email", async () => {
		const repository = new UserRepository();
		const email = await repository.getPasswordByEmail("email@teste.com");
		expect(email).toBe("Teste123");
	});

	test("Should return verification token by id", async () => {
		const repository = new UserRepository();
		const { verificationToken } = await repository.findVerficationTokenById("1", "abc-123-456");
		expect(verificationToken).toBe("abc-123-456");
	});

	test("Should return verification token by email", async () => {
		const repository = new UserRepository();
		const { verificationToken } = await repository.findVerificationTokenByEmail("email@teste.com", "abc-123-456");
		expect(verificationToken).toBe("abc-123-456");
	});

	test("Should update verification token by id", async () => {
		const repository = new UserRepository();
		await repository.updateVerificationTokenById("1", "abc-123-456");
	});

	test("Should update verification token by email", async () => {
		const repository = new UserRepository();
		await repository.updateVerificationTokenByEmail("email@teste.com", "abc-123-456");
	});

	test("Should return verification token expiry date by id", async () => {
		const repository = new UserRepository();
		const verificationTokenExpiryDate = await repository.getVerficationTokenExpiryDateById("1", "abc-123-456");
		expect(verificationTokenExpiryDate).toBe(null);
	});

	test("Should return verification token expiry date by email", async () => {
		const repository = new UserRepository();
		const verificationTokenExpiryDate = await repository.getVerificationTokenExpiryDateByEmail("email@teste.com", "abc-123-456");
		expect(verificationTokenExpiryDate).toBe(null);
	});

	test("Should update verification token expiry date by id", async () => {
		const repository = new UserRepository();
		await repository.updateVerificationTokenExpiryDateById("1", 1);
	});

	test("Should update verification token expiry date by email", async () => {
		const repository = new UserRepository();
		await repository.updateVerificationTokenExpiryDateByEmail("email@teste.com", 1);
	});

	test("Should update email", async () => {
		const repository = new UserRepository();
		await repository.updateEmail("1", "email1@teste.com");
	});

	test("Should update password by id", async () => {
		const repository = new UserRepository();
		await repository.updatePasswordById("1", "Teste456");
	});

	test("Should update password by email", async () => {
		const repository = new UserRepository();
		await repository.updatePasswordByEmail("email1@teste.com", "Teste789");
	});

	test("Should delete user", async () => {
		const repository = new UserRepository();
		await repository.delete("1");
	});

});