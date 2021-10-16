const { ok } = require("../../../adapters/adapterResponses");
const VerifyEmailUserRules = require("./VerifyEmailUserRules");

module.exports = new class DeleteUserController {

	async handle(request) {
        
		const { email, token } = request.query;
    
		const verifyEmailUserRules = new VerifyEmailUserRules();
    
		const response = await verifyEmailUserRules.execute(email, token);
    
		return ok(response);
	}
};