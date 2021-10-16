const { Router } = require("express");

const authenticateUser = require("../middlewares/authenticateUser");

const adaptMiddlewares = require("../adapters/adapterMiddlewares");
const adaptRouters = require("../adapters/adapterRouters");

const CreateUserController = require("../useCases/User/CreateUser/CreateUserController");
const DeleteUserController = require("../useCases/User/DeleteUser/DeleteUserController");
const VerifyEmailUserController = require("../useCases/User/VerifyEmailUser/VerifyEmailUserController");
const UserLoginController = require("../useCases/User/UserLogin/UserLoginController");
const SendUserEmailUpdateTokenController = require("../useCases/User/UpdateUserEmail/SendUserEmailUpdateToken/SendUserEmailUpdateTokenController");
const UpdateUserEmailController = require("../useCases/User/UpdateUserEmail/UpdateUserEmail/UpdateUserEmailController");
const RecoverUserPasswordController = require("../useCases/User/RecoverUserPassword/RecoverUserPassword/RecoverUserPasswordController");
const SendUserPasswordRecoveryTokenController = require("../useCases/User/RecoverUserPassword/SendUserPasswordRecoveryToken/SendUserPasswordRecoveryTokenController");
const UpdateUserPasswordController = require("../useCases/User/UpdateUserPassword/UpdateUserPasswordController");

const router = Router();

router.post("/user/create", adaptRouters(CreateUserController.handle));
router.post("/verify-email", adaptRouters(VerifyEmailUserController.handle));
router.post("/user/login", adaptRouters(UserLoginController.handle));
router.post("/user/email/send-token-update-email", adaptMiddlewares(authenticateUser), adaptRouters(SendUserEmailUpdateTokenController.handle));
router.patch("/update-email", adaptMiddlewares(authenticateUser), adaptRouters(UpdateUserEmailController.handle));
router.post("/user/password/send-token-password-recover", adaptRouters(SendUserPasswordRecoveryTokenController.handle));
router.patch("/user/password/password-recover", adaptRouters(RecoverUserPasswordController.handle));
router.patch("/user/password/update", adaptMiddlewares(authenticateUser), adaptRouters(UpdateUserPasswordController.handle));
router.delete("/user/delete", adaptMiddlewares(authenticateUser), adaptRouters(DeleteUserController.handle));

module.exports = router;