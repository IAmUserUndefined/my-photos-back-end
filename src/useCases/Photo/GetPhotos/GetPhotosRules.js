const { PhotoRepository } = require("../../../repositories/Photo");

module.exports = class GetPhotoRules {

	constructor(){
		this.repository = new PhotoRepository();
	}

	async execute(userId) {
		return await this.repository.getPhotos(userId);
	}
};