const { Router } = require("express");

const authenticateUser = require("../middlewares/authenticateUser");
const multer = require("../middlewares/multer");

const adaptMiddlewares = require("../adapters/adapterMiddlewares/adapterMiddlewares");
const adaptRouters = require("../adapters/adapterRouters/adapterRouters");

const AddVideoController = require("../useCases/Video/AddVideo/AddVideoController");
const GetVideosController = require("../useCases/Video/GetVideos/GetVideosController");
const RemoveVideoController = require("../useCases/Video/RemoveVideo/RemoveVideoController");

const router = Router();

router.post("/video", adaptMiddlewares(authenticateUser), multer, adaptRouters(AddVideoController.handle));
router.get("/video", adaptMiddlewares(authenticateUser), adaptRouters(GetVideosController.handle));
router.delete("/video/:videoId/:key", adaptMiddlewares(authenticateUser), adaptRouters(RemoveVideoController.handle));


module.exports = router;