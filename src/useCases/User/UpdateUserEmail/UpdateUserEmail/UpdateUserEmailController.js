const { ok } = require("../../../../adapters/adapterResponses/adapterResponses");
const UpdateUserEmailRules = require("./UpdateUserEmailRules");

module.exports = new class UpdateUserEmailController {

	async handle(request){

		const { email, verificationToken } = request.query;

		const userId = request.userId;

		const updateUserEmailRules = new UpdateUserEmailRules();

		const response = await updateUserEmailRules.execute(userId, email, verificationToken);

		return ok(response);
	}
};