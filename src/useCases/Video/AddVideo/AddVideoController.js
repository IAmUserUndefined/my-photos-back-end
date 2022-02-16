const { ok } = require("../../../adapters/adapterResponses/adapterResponses");
const AddVideoRules = require("./AddVideoRules");

module.exports = new class AddVideoController {
	
	async handle(request){
		
		const userId = request.userId;

		const { filename, originalname, location, key } = request.file;

		const addVideoRules = new AddVideoRules();

		const response = await addVideoRules.execute(userId, filename, originalname, location, key);

		return ok(response);
        
	}
};