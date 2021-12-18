const { PhotoRepository } = require("../../../repositories/Photo/PhotoRepository/PhotoRepository");

module.exports = class GetPhotoRules {

	constructor(){
		this.repository = new PhotoRepository();
	}

	async execute(userId) {
		return await this.repository.getPhotos(userId);
	}
};