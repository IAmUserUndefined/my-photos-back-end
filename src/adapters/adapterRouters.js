const { InvalidParamError, MissingParamError, UnauthorizedError } = require("../utils/errors/index");

module.exports = (router) => {

	return async (req, res) => {

		const response = await router({
			body: req.body,
			query: req.query,
			params: req.params,
			headers: req.headers,
			userId: req.userId,
			file: req.file
		});

		if (response.response instanceof UnauthorizedError)
			return res.status(401).json({ response: response.response.message });

		if (response.response instanceof InvalidParamError || response.response instanceof MissingParamError)
			return res.status(400).json({ response: response.response.message });

		if (response.response instanceof Error)
			return res.status(500).json({ response: response.response.message });

		return res.status(response.statusCode).json({ response: response.response });

	};
};