const { ok } = require("../../../adapters/adapterResponses");
const CreateUserRules = require("./CreateUserRules");

module.exports = new class CreateUserController {

	async handle(request) {

		const { email, password, passwordConfirm } = request.body;

		const createUserRules = new CreateUserRules();

		const response = await createUserRules.execute(email, password, passwordConfirm);

		return ok(response);

	}
};