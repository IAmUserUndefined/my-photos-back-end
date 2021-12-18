const { ok } = require("../../../adapters/adapterResponses/adapterResponses");
const DeleteUserRules = require("./DeleteUserRules");

module.exports = new class DeleteUserController {

	async handle(request) {

		const { password, passwordConfirm } = request.body;

		const userId = request.userId;

		const deleteUserRules = new DeleteUserRules();

		const response = await deleteUserRules.execute(userId, password, passwordConfirm);

		return ok(response);
	}
};