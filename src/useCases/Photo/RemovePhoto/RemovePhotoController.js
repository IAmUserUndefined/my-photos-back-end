const { ok } = require("../../../adapters/adapterResponses");
const RemovePhotoRules = require("./RemovePhotoRules");

module.exports = new class RemovePhotoController {
	async handle(request){
		const { photoId, key } = request.params;
        
		const userId = request.userId;

		const removePhotoRules = new RemovePhotoRules();

		const response = await removePhotoRules.execute(photoId, key, userId);

		return ok(response);
	}
};