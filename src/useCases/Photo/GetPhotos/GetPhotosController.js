const { ok } = require("../../../adapters/adapterResponses/adapterResponses");
const GetPhotosRules = require("./GetPhotosRules");

module.exports = new class GetPhotosController {
	async handle(request){
		const userId = request.userId;

		const getPhotosRules = new GetPhotosRules();

		const response = await getPhotosRules.execute(userId);

		return ok(response);
	}
};