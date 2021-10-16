const { ok } = require("../../../../adapters/adapterResponses");
const SendUserPasswordRecoveryTokenRules = require("./SendUserPasswordRecoveryTokenRules");

module.exports = new class SendUserPasswordRecoveryTokenController {

	async handle(request){
        
		const { email } = request.body; 

		const sendUserPasswordRecoveryTokenRules = new SendUserPasswordRecoveryTokenRules();

		const response = await sendUserPasswordRecoveryTokenRules.execute(email);

		return ok(response);

	}
};