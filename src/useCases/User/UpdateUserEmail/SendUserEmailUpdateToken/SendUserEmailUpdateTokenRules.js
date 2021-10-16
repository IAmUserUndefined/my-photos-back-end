const { MissingParamError, InvalidParamError } = require("../../../../utils/errors/index");

const Helper = require("../../../../utils/helper/Helper");
const Mail = require("../../../../providers/Mail/Mail");
const { UserRepository } = require("../../../../repositories/User");

module.exports = class SendUserEmailUpdateTokenRules {

	constructor() {
		this.repository = new UserRepository();
		this.mail = new Mail();
	}

	async execute(email, id) {

		if (!email)
			return new MissingParamError("Preencha o campo email");

		if (await this.repository.findEmailByEmail(email))
			return new InvalidParamError("Email já cadastrado");

		const token = Helper.createToken();

		await this.repository.updateVerificationTokenById(id, token);
		await this.repository.updateVerificationTokenExpiryDateById(id, Helper.createTokenExpiryDate());

		await this.mail.sendMail(email, "Atualização de Email", "updateUserEmailBody", {
			appUrl: Helper.getAppUrlEnvironmentVariable(),
			email: email,
			token: token
		});

		return "O link de atualização de email foi enviado para seu email, ele é válido por alguns minutos";
	}
};