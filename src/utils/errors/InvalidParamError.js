class InvalidParamError extends Error {
	constructor(paramName) {
		super(paramName);
		this.name = "InvalidParamError";
	}
}

module.exports = InvalidParamError;