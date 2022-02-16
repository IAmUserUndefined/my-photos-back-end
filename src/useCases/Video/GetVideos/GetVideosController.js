const { ok } = require("../../../adapters/adapterResponses/adapterResponses");
const GetVideosRules = require("./GetVideosRules");

module.exports = new class GetVideosController {
	
	async handle(request){

		const userId = request.userId;

		const getVideosRules = new GetVideosRules();

		const response = await getVideosRules.execute(userId);

		return ok(response);
	}
};