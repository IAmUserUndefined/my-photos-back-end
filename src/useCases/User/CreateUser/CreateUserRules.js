const { MissingParamError, InvalidParamError } = require("../../../utils/errors/index");

const Helper = require("../../../utils/helper/Helper");
const Mail = require("../../../providers/Mail/Mail");
const { UserRepository } = require("../../../repositories/User");

module.exports = class CreateUserRules {

	constructor() {
		this.repository = new UserRepository();
		this.mail = new Mail();
	}

	async execute(email, password, passwordConfirm) {

		if (!email || !password || !passwordConfirm)
			return new MissingParamError("Preencha todos os campos");

		if (await this.repository.findEmailByEmail(email))
			return new InvalidParamError("Email já cadastrado");

		const { result, message } = Helper.isPasswordValid(password);

		if (!result)
			return new InvalidParamError(message);

		if (password !== passwordConfirm)
			return new InvalidParamError("As senhas não coincidem");

		const token = Helper.createToken();

		await this.repository.create(Helper.createId(), email, Helper.encryptPassword(password), token);

		await this.mail.sendMail(email, "Verificação de Email", "createUserEmailBody", {
			appUrl: Helper.getAppUrlEnvironmentVariable(),
			email: email,
			token: token
		});

		return "Usuário cadastrado com sucesso, verique seu email";
	}
};