const { MissingParamError } = require("../../../utils/errors/index");

const Helper = require("../../../utils/helper/Helper");
const { VideoRepository } = require("../../../repositories/Video/VideoRepository/VideoRepository");

module.exports = class AddVideoRules {

	constructor(){
		this.repository = new VideoRepository();
	}

	async execute(userId, filename, originalname, location, key){
		
		if(!filename && !location)
			return new MissingParamError("Houve um problema no downlodad da foto, tente novamente");

		let url = location;

		if(!location)
			url = `${Helper.getApiUrlEnvironmentVariable()}/${filename}`;

		const videoKey = filename || key;

		await this.repository.create(Helper.createId(), userId, url, originalname, videoKey);

		return "Vídeo adicionado com sucesso";
	}
}; 