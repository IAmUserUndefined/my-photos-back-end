const { Router } = require("express");

const userRouters = require("./userRouters");
const photoRouters = require("./photoRouters");

const router = Router();

router.use(userRouters);
router.use(photoRouters);

module.exports = router;