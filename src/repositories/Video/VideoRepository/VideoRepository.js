const VideoModel = require("../../../database/models/Video");

class VideoRepository {
	async create(id, userId, url, originalname, filename){
		await VideoModel.create({
			id: id,
			userId: userId,
			url: url,
			name: originalname,
			key: filename
		}).catch(err => console.log(err));
	}

	async getVideos(userId){
		const videos = await VideoModel.findAll({
			attributes: ["id", "name", "key", "url"],
			where: {
				userId: userId
			}
		}).catch(err => console.log(err));

		return videos;
	}

	async remove(photoId, userId){
		const { Op } = require("sequelize");
		await VideoModel.destroy({
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
	VideoRepository
};