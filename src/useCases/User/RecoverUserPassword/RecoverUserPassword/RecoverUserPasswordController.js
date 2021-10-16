const { ok } = require("../../../../adapters/adapterResponses");
const RecoverUserPasswordRules = require("./RecoverUserPasswordRules");

module.exports = new class RecoverUserPasswordController {

	async handle(request){

		const { email, verificationToken } = request.query;

		const { password, passwordConfirm } = request.body;

		const recoverUserPasswordRules = new RecoverUserPasswordRules();

		const response = await recoverUserPasswordRules.execute(email, verificationToken, password, passwordConfirm);

		return ok(response);
	}
};