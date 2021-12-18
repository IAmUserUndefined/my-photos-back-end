/* eslint-disable no-unused-vars */

const { MissingParamError, UnauthorizedError } = require("../utils/errors");

const adapterRouters = require("../adapters/adapterRouters/adapterRouters");
const adapterMiddlewares = require("../adapters/adapterMiddlewares/adapterMiddlewares");
const { ok } = require("../adapters/adapterResponses/adapterResponses");

const { Router } = require("express");

const router = Router();

router.get("/router", adapterRouters((request) => {
	return ok("Response");
}));	

router.post("/router-email", adapterRouters((request) => {
	const { email } = request.body;
	return ok(email);
}));	

router.post("/router-email-query", adapterRouters((request) => {
	const { email } = request.query;
	return ok(email);
}));

router.post("/router/:id", adapterRouters((request) => {
	const { id } = request.params;
	return ok(id);
}));

router.get("/router-error", adapterRouters((request) => {
	return ok(new MissingParamError("Preencha todos os campos"));
}));

router.get("/middleware-unathorized", 
	adapterMiddlewares(async (request) => {
		const { authorization } = request.headers;
				
		if(!authorization)
			return new UnauthorizedError("Token Inválido");
	}),
	adapterRouters((request) => {
		const userId = request.userId;
		return ok(userId);
	}));	

router.get("/middleware-userid", 
	adapterMiddlewares(async (request) => {
		const { authorization } = request.headers;

		const [, token] = authorization.split(" ");

		return token;
	}),
	adapterRouters((request) => {
		const userId = request.userId;
		return ok(userId);
	}));		


module.exports = router;