const { MissingParamError, InvalidParamError } = require("../../../utils/errors/index");

const Helper = require("../../../utils/helper/Helper");
const { UserRepository } = require("../../../repositories/User/UserRepository/UserRepository");

module.exports = class DeleteUserRules {

	constructor() {
		this.repository = new UserRepository();
	}

	async execute(id, password, passwordConfirm) {

		if (!password || !passwordConfirm)
			return new MissingParamError("Preencha todos os campos");

		if (password !== passwordConfirm)
			return new InvalidParamError("As senhas não coincidem");

		const comparePassword = Helper.compareEncryptPassword(password, await this.repository.getPasswordById(id));

		if (comparePassword) {
			await this.repository.delete(id);
			return "Usuário excluído com sucesso";
		}

		return new InvalidParamError("A sua senha está incorreta");

	}
};