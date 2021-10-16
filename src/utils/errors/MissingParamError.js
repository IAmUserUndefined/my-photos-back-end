class MissingParamError extends Error {
	constructor(paramName) {
		super(paramName);
		this.name = "MissingParamError";
	}
}

module.exports = MissingParamError;