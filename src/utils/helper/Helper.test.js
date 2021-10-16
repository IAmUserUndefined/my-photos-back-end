/* eslint-disable no-undef */

const { UnauthorizedError } = require("../errors/index");

const Helper = require("./Helper");

describe("Test of environment variable get", () => {

	test("Should return environment variable ", () => {
          
		const appUrl = Helper.getAppUrlEnvironmentVariable();
		const email = Helper.getEmailEnvironmentVariable();
		const password = Helper.getEmailPasswordEnvironmentVariable();
		const secretKeyJwt = Helper.getSecretKeyJwtEnvironmentVariable();
		const databaseUsername = Helper.getDatabaseUsernameEnvironmentVariable();
		const databasePassword = Helper.getDatabasePasswordEnvironmentVariable();
		const databaseDialect = Helper.getDatabaseDialectEnvironmentVariable();
		const databasePort = Helper.getDatabasePortEnvironmentVariable();
		const databaseName = Helper.getDatabaseNameEnvironmentVariable();
		const host = Helper.getHostEnvironmentVariable();

		expect(appUrl).not.toBeUndefined();
		expect(email).not.toBeUndefined();
		expect(password).not.toBeUndefined();
		expect(secretKeyJwt).not.toBeUndefined();
		expect(databaseUsername).not.toBeUndefined();
		expect(databasePassword).not.toBeUndefined();
		expect(databaseDialect).not.toBeUndefined();
		expect(databasePort).not.toBeUndefined();
		expect(databaseName).not.toBeUndefined();
		expect(host).not.toBeUndefined();
	});
});

describe("Test of creation functions", () => {

	test("Should return the creations", () => {
          
		const id = Helper.createId();
		const token = Helper.createToken();
		const tokenExpiryDate = Helper.createTokenExpiryDate();
		const jwt = Helper.createJwt( { email: "joao@teste.com" } );

		expect(id).not.toBeUndefined();
		expect(token).not.toBeUndefined();
		expect(tokenExpiryDate).not.toBeUndefined();
		expect(jwt).not.toBeUndefined();
	});
});

describe("Test of jwt verify", () => {

	test("Should not validate the jwt,", () => {

		const jwt = "SecretKeyJWT";    
		const response = Helper.jwtVerify(jwt);
		expect(response).toBeInstanceOf(UnauthorizedError);
	});

	test("Should validate the jwt", () => {

		const jwt = Helper.createJwt( { email: "joao@teste.com" } );
		const verifyJwt = Helper.jwtVerify(jwt);
		expect(verifyJwt.email).toBe("joao@teste.com");
	});
    
});

describe("Test of password regex", () => {
	test("Should return false, because the password has not a letter uppercase", async () => {
		const { result } = Helper.isPasswordValid("corinthians1910");
		expect(result).toBe(false);
	});	

	test("Should return false, because the password has not a letter lowercase", async () => {
		const { result } = Helper.isPasswordValid("CORINTHIANS1910");
		expect(result).toBe(false);
	});	

	test("Should return false, because the password has not a number", async () => {
		const { result } = Helper.isPasswordValid("Corinthians");
		expect(result).toBe(false);
	});

	test("Should return false, because the password has not eight characters", async () => {
		const { result } = Helper.isPasswordValid("Cor15");
		expect(result).toBe(false);
	});

	test("Should return true, because the password is spelled correctly", () => {
		const { result } = Helper.isPasswordValid("Corinthians1910");
		expect(result).toBe(true);
	});
});

describe("Test of password encryption", () => {

	test("Should return a encryption", () => {

		expect(Helper.encryptPassword("Corinthians1910")).not.toBeUndefined();
	});
    
});

describe("Test of password compare", () => {
	test("Should return null, because the password is incorrect", () => {
        
		const encryption = Helper.encryptPassword("Corinthians1910");
		const response = Helper.compareEncryptPassword("Corinthians19101", encryption);
		expect(response).toBe(false);
	});

	test("Should return true, because the password is correct", () => {
        
		const encryption = Helper.encryptPassword("Corinthians1910");
		const response = Helper.compareEncryptPassword("Corinthians1910", encryption);
		expect(response).toBe(true);
	});
});