const Helper = require("../../../utils/helper/Helper");
const { VideoRepository } = require("../../../repositories/Video/VideoRepository/VideoRepository");

module.exports = class RemoveVideoRules {

	constructor(){
		this.repository = new VideoRepository();
	}

	async execute(videoId, key, userId){
		await this.repository.remove(videoId, userId);

		if(Helper.getStorageEnvironmentVariable() === "s3"){ 
			Helper.removeFileAws(key);
		}else{
			Helper.deleteFile(key);
		}

		return "Vídeo excluído com sucesso";
	}
};