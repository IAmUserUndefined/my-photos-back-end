const UserModel = require("../../../database/models/User");

class UserRepository {

	async create(id, email, hash, token) {
		await UserModel.create({
			id: id,
			email: email,
			password: hash,
			verificationToken: token
		});
	}

	async verifyEmail(email, token) {
		const { Op } = require("sequelize");
		await UserModel.update(
			{ verifiedEmail: true },
			{
				where: {
					[Op.and]: [
						{ email: email },
						{ verificationToken: token }
					]
				}
			}
		);
	}

	async delete(id) {
		await UserModel.destroy(
			{
				where: {
					id: id
				}
			}
		);
	}

	async findEmailById(id) {
		const userEmail = await UserModel.findOne({
			where: { id: id },
			attributes: ["email"]
		});
		return userEmail;
	}

	async findEmailByEmail(email) {
		const userEmail = await UserModel.findOne({
			where: { email: email },
			attributes: ["email"]
		});
		return userEmail;
	}

	async findByEmailVerified(email) {
		const { Op } = require("sequelize");
		const userEmail = await UserModel.findOne({
			where: {
				[Op.and]: [
					{ email : email},
					{ verifiedEmail: true }
				]
			},
			attributes: ["email"]
		});
		return userEmail;
	}

	async getId(email) {
		const { id } = await UserModel.findOne({
			attributes: ["id"],
			where: {
				email: email,
			},
		});

		return id;
	}

	async getPasswordById(id) {
		const { password } = await UserModel.findOne({
			attributes: ["password"],
			where: { id : id }
		});
        
		return password;
	}

	async getPasswordByEmail(email) {
		const { password } = await UserModel.findOne({
			attributes: ["password"],
			where: { email : email }
		});
        
		return password;
	}

	async findVerficationTokenById(id, verificationToken) {
		const { Op } = require("sequelize");
		const userVerificationToken = await UserModel.findOne({
			attributes: ["verificationToken"],
			where: {
				[Op.and]: [
					{ id: id }, 
					{ verificationToken: verificationToken }
				],
			},
		});
		return userVerificationToken;
	}

	async findVerificationTokenByEmail(email, verificationToken) {
		const { Op } = require("sequelize");
		const userVerificationToken = await UserModel.findOne({
			attributes: ["verificationToken"],
			where: {
				[Op.and]: [
					{ email: email }, 
					{ verificationToken: verificationToken }
				],
			},
		});
		return userVerificationToken;
	}

	async updateVerificationTokenById(id, verificationToken) {
		await UserModel.update(
			{ verificationToken: verificationToken },
			{
				where: {
					id: id,
				},
			}
		);
	}

	async updateVerificationTokenByEmail(email, verificationToken) {
		await UserModel.update(
			{ verificationToken: verificationToken },
			{
				where: {
					email: email,
				},
			}
		);
	}

	async getVerficationTokenExpiryDateById(id, verificationToken) {
		const { Op } = require("sequelize");
		const { verificationTokenExpiryDate } = await UserModel.findOne({
			attributes: ["verificationTokenExpiryDate"],
			where: {
				[Op.and]: [{ id: id }, { verificationToken: verificationToken }],
			},
		});
		return verificationTokenExpiryDate;
	}

	async getVerificationTokenExpiryDateByEmail(email, verificationToken) {
		const { Op } = require("sequelize");
		const { verificationTokenExpiryDate } = await UserModel.findOne({
			attributes: ["verificationTokenExpiryDate"],
			where: {
				[Op.and]: [
					{ email: email }, 
					{ verificationToken: verificationToken }
				],
			},
		});
		return verificationTokenExpiryDate;
	}
    
	async updateVerificationTokenExpiryDateById(id, verificationTokenExpiryDate) {
		await UserModel.update(
			{ verificationTokenExpiryDate: verificationTokenExpiryDate  },
			{
				where: {
					id: id,
				},
			}
		);
	}

	async updateVerificationTokenExpiryDateByEmail(email, verificationTokenExpiryDate) {
		await UserModel.update(
			{ verificationTokenExpiryDate: verificationTokenExpiryDate },
			{
				where: {
					email: email,
				},
			}
		);
	}

	async updateEmail(id, email) {
		await UserModel.update(
			{ email: email },
			{
				where: {
					id: id,
				},
			}
		);
	}

	async updatePasswordById(id, passwordNew) {
		await UserModel.update(
			{ password: passwordNew },
			{
				where: {
					id: id,
				},
			}
		);
	}
    
	async updatePasswordByEmail(email, passwordNew) {
		await UserModel.update(
			{ password: passwordNew },
			{
				where: {
					email: email,
				},
			}
		);
	}
}

class UserTestRepository {

	async createTestUsers(){

		await UserModel.create({
			id: "aa98bc1b-22f4-4fc6-be64-3d830068bddc",
			email: "joao@teste.com",
			password: "$2a$10$qccZ2L8csoUcHQR1mMFkJulToLLZTe7Xo7DnM19dV4Ly3r1OkBg6S",
			verificationToken: "544f818f5f5cd4cde44c611683fc71",
			verifiedEmail: true,
			verificationTokenExpiryDate: 16333909805121
		});
	
		await UserModel.create({
			id: "ff98bc1b-22f4-4fc6-be64-3d830068bzaa",
			email: "joao1000@teste.com",
			password: "$2a$10$qccZ2L8csoUcHQR1mMFkJulToLLZTe7Xo7DnM19dV4Ly3r1OkBg6S",
			verificationToken: "216d685d384626d9a575629dc38e88",
			verifiedEmail: false
		});

		await UserModel.create({
			id: "fe98bc1b-22f4-4fc6-be64-3d830068bddd",
			email: "joao5000@teste.com",
			name: "João Pedro",
			password: "$2a$10$qccZ2L8csoUcHQR1mMFkJulToLLZTe7Xo7DnM19dV4Ly3r1OkBg6S",
			verificationToken: "544f818f5f5cd4cde44c611683fc71",
			verifiedEmail: true,
			verificationTokenExpiryDate: 0
		});

	}

	async deleteTestUsers(){
		await UserModel.destroy({
			where: {}
		});
	}
}

module.exports = {
	UserRepository,
	UserTestRepository
};