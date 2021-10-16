const Helper = require("../../../utils/helper/Helper");
const { PhotoRepository } = require("../../../repositories/Photo");

module.exports = class RemovePhotoRules {
	constructor(){
		this.repository = new PhotoRepository();
	}

	async execute(photoId, key, userId){
		await this.repository.remove(photoId, userId);

		Helper.deleteFile(key);

		return "Foto excluída com sucesso";
	}
}; 