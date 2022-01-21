const UserModel = require("../../../database/models/User");

class UserRepository {

	async create(id, email, hash, token) {
		await UserModel.create({
			id: id,
			email: email,
			password: hash,
			verificationToken: token
		}).catch(err => console.log(err));
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
		).catch(err => console.log(err));
	}

	async delete(id) {
		await UserModel.destroy(
			{
				where: {
					id: id
				}
			}
		).catch(err => console.log(err));
	}

	async findEmailById(id) {
		const userEmail = await UserModel.findOne({
			where: { id: id },
			attributes: ["email"]
		}).catch(err => console.log(err));
		return userEmail;
	}

	async findEmailByEmail(email) {
		const userEmail = await UserModel.findOne({
			where: { email: email },
			attributes: ["email"]
		}).catch(err => console.log(err));
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
		}).catch(err => console.log(err));
		return userEmail;
	}

	async getId(email) {
		const { id } = await UserModel.findOne({
			attributes: ["id"],
			where: {
				email: email,
			},
		}).catch(err => console.log(err));

		return id;
	}

	async getPasswordById(id) {
		const { password } = await UserModel.findOne({
			attributes: ["password"],
			where: { id : id }
		}).catch(err => console.log(err));
        
		return password;
	}

	async getPasswordByEmail(email) {
		const { password } = await UserModel.findOne({
			attributes: ["password"],
			where: { email : email }
		}).catch(err => console.log(err));
        
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
		}).catch(err => console.log(err));
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
		}).catch(err => console.log(err));
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
		).catch(err => console.log(err));
	}

	async updateVerificationTokenByEmail(email, verificationToken) {
		await UserModel.update(
			{ verificationToken: verificationToken },
			{
				where: {
					email: email,
				},
			}
		).catch(err => console.log(err));
	}

	async getVerficationTokenExpiryDateById(id, verificationToken) {
		const { Op } = require("sequelize");
		const { verificationTokenExpiryDate } = await UserModel.findOne({
			attributes: ["verificationTokenExpiryDate"],
			where: {
				[Op.and]: [{ id: id }, { verificationToken: verificationToken }],
			},
		}).catch(err => console.log(err));
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
		}).catch(err => console.log(err));
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
		).catch(err => console.log(err));
	}

	async updateVerificationTokenExpiryDateByEmail(email, verificationTokenExpiryDate) {
		await UserModel.update(
			{ verificationTokenExpiryDate: verificationTokenExpiryDate },
			{
				where: {
					email: email,
				},
			}
		).catch(err => console.log(err));
	}

	async updateEmail(id, email) {
		await UserModel.update(
			{ email: email },
			{
				where: {
					id: id,
				},
			}
		).catch(err => console.log(err));
	}

	async updatePasswordById(id, passwordNew) {
		await UserModel.update(
			{ password: passwordNew },
			{
				where: {
					id: id,
				},
			}
		).catch(err => console.log(err));
	}
    
	async updatePasswordByEmail(email, passwordNew) {
		await UserModel.update(
			{ password: passwordNew },
			{
				where: {
					email: email,
				},
			}
		).catch(err => console.log(err));
	}
}

module.exports = {
	UserRepository
};