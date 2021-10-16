const { MissingParamError, InvalidParamError } = require("../../../../utils/errors/index");

const Helper = require("../../../../utils/helper/Helper");
const { UserRepository } = require("../../../../repositories/User");

module.exports = class RecoverUserPasswordRules {

	constructor() {
		this.repository = new UserRepository();
	}

	async execute(email, verificationToken, password, passwordConfirm) {

		if (!password || !passwordConfirm || !email || !verificationToken)
			return new MissingParamError("Preencha todos os campos");

		if (!await this.repository.findVerificationTokenByEmail(email, verificationToken))
			return new InvalidParamError("Token Inválido");

		if (Date.now() > await this.repository.getVerificationTokenExpiryDateByEmail(email, verificationToken))
			return new InvalidParamError("Link expirado, recomece o processo");

		const userPassword = await this.repository.getPasswordByEmail(email);

		const passwordCompare = Helper.compareEncryptPassword(password, userPassword);

		if (passwordCompare)
			return new InvalidParamError("A sua nova senha não pode ser igual a anterior");

		const { result, message } = Helper.isPasswordValid(password);

		if (!result)
			return new InvalidParamError(message);

		if (password !== passwordConfirm)
			return new InvalidParamError("As senhas não coincidem");

		await this.repository.updatePasswordByEmail(email, Helper.encryptPassword(password));

		await this.repository.updateVerificationTokenExpiryDateByEmail(email, 0);

		return "Senha atualizada com sucesso";
	}
};