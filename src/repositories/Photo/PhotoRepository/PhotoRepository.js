const PhotoModel = require("../../../database/models/Photo");

class PhotoRepository {
	async create(id, userId, url, originalname, filename){
		await PhotoModel.create({
			id: id,
			userId: userId,
			url: url,
			name: originalname,
			key: filename
		}).catch(err => console.log(err));
	}

	async getPhotos(userId){
		const photos = await PhotoModel.findAll({
			attributes: ["id", "name", "key", "url"],
			where: {
				userId: userId
			}
		}).catch(err => console.log(err));

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
		}).catch(err => console.log(err));
	}
}
module.exports = {
	PhotoRepository
};