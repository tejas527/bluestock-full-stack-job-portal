const express = require("express");
const AuthRouter = express.Router();
const {
    authenticateUser,
} = require("./../Middleware/UserAuthenticationMiddleware");

// Controllers
const UserController = require("../Controller/UserController");

const {
    checkRegisterInput,
    checkLoginInput,
} = require("../Validation/UserDataRules");

const {
    inputValidationMiddleware,
} = require("../Validation/ValidationMiddleware");

const { clientPlatform } = require("../Middleware/clientPlatform");

// Authentication routes
AuthRouter.post("/logout", clientPlatform, authenticateUser, UserController.logOut);
AuthRouter.get("/me", clientPlatform, authenticateUser, UserController.getMe);

AuthRouter.post(
    "/register",
    clientPlatform,
    checkRegisterInput,
    inputValidationMiddleware,
    UserController.addUser
);
AuthRouter.post(
    "/login",
    clientPlatform,
    checkLoginInput,
    inputValidationMiddleware,
    UserController.loginUser
);

AuthRouter.post("/google", clientPlatform, UserController.googleAuth);

module.exports = AuthRouter;