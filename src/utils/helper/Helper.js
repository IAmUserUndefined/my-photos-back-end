const { UnauthorizedError } = require("../errors/index");

require("dotenv/config");

const uuid = require("uuid");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const aws = require("aws-sdk");

module.exports = class Helper {

	static async removeFileAws(key){

		const s3 =  new aws.S3({
			accessKeyId: this.getAwsAccessKeyEnvironmentVariable(),
			secretAccessKey: this.getAwsAccessSecretKeyEnvironmentVariable(),
			region: this.getAwsDefaultRegionEnvironmentVariable()
		});

		s3.deleteObject({
			Bucket: this.getBucketNamenvironmentVariable(),
			Key: key
		})
			.promise();
	}

	static getAwsAccessKeyEnvironmentVariable(){
		return process.env.AWS_ACCESS_KEY_ID;
	}

	static getAwsAccessSecretKeyEnvironmentVariable(){
		return process.env.AWS_SECRET_KEY_ID;
	}

	static getAwsDefaultRegionEnvironmentVariable(){
		return process.env.AWS_DEFAULT_REGION;
	}

	static getStorageEnvironmentVariable(){
		return process.env.STORAGE;
	}

	static getBucketNamenvironmentVariable(){
		return process.env.BUCKET_NAME;
	}

	static getAppUrlEnvironmentVariable(){
		return process.env.APP_URL;
	}

	static getApiUrlEnvironmentVariable(){
		return process.env.API_URL;
	}

	static getEmailEnvironmentVariable(){
		return process.env.EMAIL;
	}

	static getEmailPasswordEnvironmentVariable(){
		return process.env.EMAIL_PASSWORD;
	}

	static getSecretKeyJwtEnvironmentVariable(){
		return process.env.SECRET_KEY_JWT;
	}

	static getDatabaseUsernameEnvironmentVariable(){
		return process.env.DB_USERNAME;
	}

	static getDatabasePasswordEnvironmentVariable(){
		return process.env.DB_PASSWORD;
	}
    
	static getDatabaseNameEnvironmentVariable(){
		return process.env.DB_NAME;
	}

	static getDatabasePortEnvironmentVariable(){
		return process.env.DB_PORT;
	}

	static getDatabaseDialectEnvironmentVariable(){
		return process.env.DB_DIALECT;
	}

	static getHostEnvironmentVariable(){
		return process.env.HOST;
	}
    
	static createId() {
		return uuid.v4();
	}

	static createToken() {
		return crypto.randomBytes(15).toString("hex");
	}

	static createTokenExpiryDate() {
		return new Date().setMinutes(new Date().getMinutes() + 10);
	}

	static createJwt(user) {
		return jwt.sign(user, this.getSecretKeyJwtEnvironmentVariable(), { expiresIn: 7200 } );
	}

	static jwtVerify(tokenJwt){

		try {

			const decode = jwt.verify(tokenJwt, this.getSecretKeyJwtEnvironmentVariable());

			return decode;
		}

		catch { return new UnauthorizedError("Token Inválido, logue-se novamente"); }

	}

	static isPasswordValid(password){
		return {
			result: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])){8,}$/.test(password),
			message: "Sua senha precisa ter 8 caracteres, uma letra maiúscula, uma minúscula e um número"
		};
	}

	static encryptPassword(password){
		return bcrypt.hashSync(password, 10);
	}

	static compareEncryptPassword(password, userPassword){
		return bcrypt.compareSync(password, userPassword);
	}

	static deleteFile(filename) {
		fs.unlinkSync(path.resolve(__dirname, "..", "tmp", filename));
	}
};