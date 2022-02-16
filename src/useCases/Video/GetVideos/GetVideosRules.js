const { VideoRepository } = require("../../../repositories/Video/VideoRepository/VideoRepository");

module.exports = class GetVideosRules {

	constructor(){
		this.repository = new VideoRepository();
	}

	async execute(userId) {
		return await this.repository.getVideos(userId);
	}
};