const PhotoModel = require("../../../database/models/Photo");

class PhotoRepository {
	async create(id, userId, url, originalname, filename){
		await PhotoModel.create({
			id: id,
			userId: userId,
			url: url,
			name: originalname,
			key: filename
		});
	}

	async getPhotos(userId){
		const photos = await PhotoModel.findAll({
			attributes: ["id", "name", "key", "url"],
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
module.exports = {
	PhotoRepository
};