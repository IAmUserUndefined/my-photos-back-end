const { MissingParamError, InvalidParamError } = require("../../../utils/errors/index");

const { UserRepository } = require("../../../repositories/User/UserRepository/UserRepository");

module.exports = class VerifyEmailUserRules {

	constructor() {
		this.repository = new UserRepository();
	}

	async execute(email, token) {

		if (!email || !token)
			return new MissingParamError("Preencha todos os campos");

		if (await this.repository.findByEmailVerified(email))
			return new InvalidParamError("Email já verificado");

		if (!await this.repository.findVerificationTokenByEmail(email, token))
			return new InvalidParamError("Token inválido");

		await this.repository.verifyEmail(email, token);

		return "Email verificado com sucesso";
	}
};