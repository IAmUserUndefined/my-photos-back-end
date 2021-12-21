const { ok } = require("../../../adapters/adapterResponses/adapterResponses");
const AddPhotoRules = require("./AddPhotoRules");

module.exports = new class AddPhotoController {
	async handle(request){
		
		const userId = request.userId;

		const { filename, originalname, location, key } = request.file;

		const addPhotoRules = new AddPhotoRules();

		const response = await addPhotoRules.execute(userId, filename, originalname, location, key);

		return ok(response);
        
	}
};