const { MissingParamError, InvalidParamError } = require("../../../../utils/errors/index");

const { UserRepository } = require("../../../../repositories/User/UserRepository/UserRepository");

module.exports = class UpdateUserEmailRules {

	constructor() {
		this.repository = new UserRepository();
	}

	async execute(id, email, verificationToken) {

		if (!email || !verificationToken)
			return new MissingParamError("Preencha todos os campos");

		if (!await this.repository.findVerficationTokenById(id, verificationToken))
			return new InvalidParamError("Token Inválido");

		if (Date.now() > await this.repository.getVerficationTokenExpiryDateById(id, verificationToken))
			return new InvalidParamError("Link expirado, recomece o processo");

		await this.repository.updateEmail(id, email);

		await this.repository.updateVerificationTokenExpiryDateById(id, 0);

		return "Email atualizado com sucesso";

	}
};