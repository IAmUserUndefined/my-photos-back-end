const ok = async (response) => {
	return {
		statusCode: 200,
		response: response
	};
};

module.exports = {
	ok
};