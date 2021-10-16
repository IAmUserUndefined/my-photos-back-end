const { ok } = require("../../../../adapters/adapterResponses");
const SendUserEmailUpdateTokenRules = require("./SendUserEmailUpdateTokenRules");

module.exports = new class SendUserEmailUpdateTokenController {

	async handle(request){
        
		const { email } = request.body; 

		const userId = request.userId; 

		const sendUserEmailUpdateTokenRules = new SendUserEmailUpdateTokenRules();

		const response = await sendUserEmailUpdateTokenRules.execute(email, userId);

		return ok(response);
	}
};