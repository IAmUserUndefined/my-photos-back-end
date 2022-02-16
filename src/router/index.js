const { Router } = require("express");

const userRouters = require("./userRouters");
const photoRouters = require("./photoRouters");
const videoRouters = require("./videoRouters");
const testRouter = require("./testRouter");

const router = Router();

router.use(userRouters);
router.use(photoRouters);
router.use(videoRouters);
router.use(testRouter);

module.exports = router;