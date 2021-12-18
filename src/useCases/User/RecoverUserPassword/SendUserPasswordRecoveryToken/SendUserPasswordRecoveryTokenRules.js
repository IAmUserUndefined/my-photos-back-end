const { MissingParamError, InvalidParamError } = require("../../../../utils/errors/index");

const Helper = require("../../../../utils/helper/Helper");
const Mail = require("../../../../providers/Mail/Mail");
const { UserRepository } = require("../../../../repositories/User/UserRepository/UserRepository");

module.exports = class SendUserPasswordRecoveryTokenRules {

	constructor() {
		this.repository = new UserRepository();
		this.mail = new Mail();
	}

	async execute(email) {

		if (!email)
			return new MissingParamError("Preencha o campo email");

		if (!await this.repository.findEmailByEmail(email))
			return new InvalidParamError("Email não cadastrado");

		const token = Helper.createToken();

		await this.repository.updateVerificationTokenByEmail(email, token);
		await this.repository.updateVerificationTokenExpiryDateByEmail(email, Helper.createTokenExpiryDate());

		await this.mail.sendMail(email, "Recuperação de Senha", "recoverPasswordEmailBody", {
			appUrl: Helper.getAppUrlEnvironmentVariable(),
			email: email,
			token: token
		});

		return "O link de recuperação de senha foi enviado para seu email, ele é válido por alguns minutos";
	}
};