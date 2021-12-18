const { Router } = require("express");

const userRouters = require("./userRouters");
const photoRouters = require("./photoRouters");
const testRouter = require("./testRouter");

const router = Router();

router.use(userRouters);
router.use(photoRouters);
router.use(testRouter);

module.exports = router;