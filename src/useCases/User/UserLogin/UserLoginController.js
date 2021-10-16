const { ok } = require("../../../adapters/adapterResponses");
const UserLoginRules = require("./UserLoginRules");

module.exports = new class UserLoginController {

	async handle(request){
        
		const { email, password } = request.body;
        
		const userLoginRules = new UserLoginRules();

		const response = await userLoginRules.execute(email, password);

		return ok(response);
	}
};