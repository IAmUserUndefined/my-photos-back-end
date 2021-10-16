const { MissingParamError } = require("../../../utils/errors/index");

const Helper = require("../../../utils/helper/Helper");
const { PhotoRepository } = require("../../../repositories/Photo");

module.exports = class AddPhotoRules {

	constructor(){
		this.repository = new PhotoRepository();
	}

	async execute(userId, filename, originalname){
		
		if(!filename)
			return new MissingParamError("Houve um problema no downlodad da foto, tente novamente");

		const url = `${Helper.getApiUrlEnvironmentVariable()}/${filename}`;

		await this.repository.create(Helper.createId(), userId, url, originalname, filename);

		return "Foto adicionada com sucesso";
	}
}; 