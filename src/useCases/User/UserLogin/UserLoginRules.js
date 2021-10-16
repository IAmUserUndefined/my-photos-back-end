const { MissingParamError, UnauthorizedError } = require("../../../utils/errors/index");

const { UserRepository } = require("../../../repositories/User");
const Helper = require("../../../utils/helper/Helper");

module.exports = class UserLoginRules {

	constructor() {
		this.repository = new UserRepository();
	}

	async execute(email, password) {

		if (!email || !password)
			return new MissingParamError("Preencha todos os campos");

		if (!await this.repository.findEmailByEmail(email))
			return new UnauthorizedError("Email/Senha Incorreto(s)");

		if (!await this.repository.findByEmailVerified(email))
			return new UnauthorizedError("Email não verificado");

		const result = Helper.compareEncryptPassword(password, await this.repository.getPasswordByEmail(email));

		const id = await this.repository.getId(email);

		if (result)
			return Helper.createJwt({ id, email });

		return new UnauthorizedError("Email/Senha Incorreto(s)");
	}
};