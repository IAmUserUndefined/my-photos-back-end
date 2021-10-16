const UserModel = require("../database/models/User");
const PhotoModel = require("../database/models/Photo");

class PhotoRepository {
	async create(id, userId, url, originalname, filename){
		PhotoModel.create({
			id: id,
			userId: userId,
			url: url,
			name: originalname,
			key: filename
		});
	}

	async getPhotos(userId){
		const photos = await PhotoModel.findAll({
			attributes: ["id", "name", "key"],
			where: {
				userId: userId
			}
		});

		return photos;
	}

	async remove(photoId, userId){
		const { Op } = require("sequelize");
		await PhotoModel.destroy({
			where:{
				[Op.and]: [
					{ id: photoId }, 
					{ userId: userId}
				]
			}
		});
	}
}

class PhotoTestRepository {

	async createTestUser() {
		await UserModel.create({
			id: "aa98bc1b-22f4-4fc6-be64-3d830068bdqq",
			email: "joao@teste.com",
			password: "$2a$10$qccZ2L8csoUcHQR1mMFkJulToLLZTe7Xo7DnM19dV4Ly3r1OkBg6S",
			verificationToken: "544f818f5f5cd4cde44c611683fc71",
			verifiedEmail: true
		});
	}

	async removePhotoAndUserTest() {
		await PhotoModel.destroy({
			where: {}
		});

		await UserModel.destroy({
			where: {}
		});
	}

	async getPhotoKey() {
		const { key } = await PhotoModel.findOne({
			attributes: ["key"],
			where: {
				userId: "aa98bc1b-22f4-4fc6-be64-3d830068bdqq"
			}
		});

		return key;
	}

	async getIdAndKey() {
		const { dataValues } = await PhotoModel.findOne({
			where: {
				userId: "aa98bc1b-22f4-4fc6-be64-3d830068bdqq"
			}
		});

		return dataValues;
	}
}

module.exports = {
	PhotoRepository,
	PhotoTestRepository
};