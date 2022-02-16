const { ok } = require("../../../adapters/adapterResponses/adapterResponses");
const RemoveVideoRules = require("./RemoveVideoRules");

module.exports = new class RemoveVideoController {

	async handle(request){

		const { videoId, key } = request.params;
        
		const userId = request.userId;

		const removeVideoRules = new RemoveVideoRules();

		const response = await removeVideoRules.execute(videoId, key, userId);

		return ok(response);
	}
};