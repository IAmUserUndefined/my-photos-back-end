const { UnauthorizedError } = require("../../utils/errors/index");

module.exports = (middleware) => {

	return async (req, res, next) => {

		const response = await middleware({
			headers: req.headers
		});

		if (response instanceof UnauthorizedError)
			return res.status(401).json({ response: response.message });

		if(response)
			req.userId = response;

		return next();
	};
};