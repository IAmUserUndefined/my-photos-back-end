class NotAllowedCors extends Error {
	constructor(paramName) {
		super(paramName);
		this.name = "NotAllowedCors";
	}
}

module.exports = NotAllowedCors;