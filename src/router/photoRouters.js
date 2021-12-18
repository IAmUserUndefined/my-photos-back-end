const { Router } = require("express");

const authenticateUser = require("../middlewares/authenticateUser");
const multer = require("../middlewares/multer");

const adaptMiddlewares = require("../adapters/adapterMiddlewares/adapterMiddlewares");
const adaptRouters = require("../adapters/adapterRouters/adapterRouters");

const AddPhotoController = require("../useCases/Photo/AddPhoto/AddPhotoController");
const GetPhotosController = require("../useCases/Photo/GetPhotos/GetPhotosController");
const RemovePhotosController = require("../useCases/Photo/RemovePhoto/RemovePhotoController");

const router = Router();

router.post("/photo", adaptMiddlewares(authenticateUser), multer, adaptRouters(AddPhotoController.handle));
router.get("/photo", adaptMiddlewares(authenticateUser), adaptRouters(GetPhotosController.handle));
router.delete("/photo/:photoId/:key", adaptMiddlewares(authenticateUser), adaptRouters(RemovePhotosController.handle));


module.exports = router;