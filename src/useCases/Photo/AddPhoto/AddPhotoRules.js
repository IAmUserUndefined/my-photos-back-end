const { MissingParamError } = require("../../../utils/errors/index");

const Helper = require("../../../utils/helper/Helper");
const { PhotoRepository } = require("../../../repositories/Photo/PhotoRepository/PhotoRepository");

module.exports = class AddPhotoRules {

	constructor(){
		this.repository = new PhotoRepository();
	}

	async execute(userId, filename, originalname, location, key){
		
		if(!filename && !location)
			return new MissingParamError("Houve um problema no downlodad da foto, tente novamente");

		let url = location;

		if(!location)
			url = `${Helper.getApiUrlEnvironmentVariable()}/${filename}`;

		const photoKey = filename || key;

		await this.repository.create(Helper.createId(), userId, url, originalname, photoKey);

		return "Foto adicionada com sucesso";
	}
}; 