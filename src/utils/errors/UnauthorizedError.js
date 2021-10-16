class UnauthorizedError extends Error {
	constructor(paramName) {
		super(paramName);
		this.name = "UnauthorizedError";
	}
}

module.exports = UnauthorizedError;