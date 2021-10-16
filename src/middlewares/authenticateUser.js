const { UnauthorizedError } = require("../utils/errors/index");

const Helper = require("../utils/helper/Helper");

module.exports = async (request) => {

	const { authorization } = request.headers;

	if (!authorization)
		return new UnauthorizedError("Você não está logado");

	const [, token] = authorization.split(" ");

	const decode = Helper.jwtVerify(token);

	if (decode instanceof UnauthorizedError)
		return decode;

	return decode.id; 
};