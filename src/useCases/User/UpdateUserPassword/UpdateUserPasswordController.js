const { ok } = require("../../../adapters/adapterResponses/adapterResponses");
const UpdateUserPasswordRules = require("./UpdateUserPasswordRules");

module.exports = new class UpdateUserPasswordController {

	async handle(request){

		const { passwordCurrent, newPassword, newPasswordConfirm } = request.body;

		const userId = request.userId;

		const updateUserPasswordRules = new UpdateUserPasswordRules();

		const response = await updateUserPasswordRules.execute(userId, passwordCurrent, newPassword, newPasswordConfirm); 

		return ok(response);
	}
};