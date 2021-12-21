const Helper = require("../../../utils/helper/Helper");
const { PhotoRepository } = require("../../../repositories/Photo/PhotoRepository/PhotoRepository");

module.exports = class RemovePhotoRules {
	constructor(){
		this.repository = new PhotoRepository();
	}

	async execute(photoId, key, userId){
		await this.repository.remove(photoId, userId);

		if(Helper.getStorageEnvironmentVariable() === "s3"){ 
			Helper.removeFileAws(key);
		}else{
			Helper.deleteFile(key);
		}

		return "Foto excluída com sucesso";
	}
}; 