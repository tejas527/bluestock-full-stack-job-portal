const express = require("express");
const UserRouter = express.Router();

// Import controller methods
const {
    getAllUser,
    getSingleUser,
    getMe,
    logOut,
    addUser,
    loginUser,
    updateUser,
    deleteUser,
    deleteAllUser
} = require("../Controller/UserController");

const { clientPlatform } = require("../Middleware/clientPlatform");

// Import validation and middleware
const {
    checkRegisterInput,
    checkLoginInput,
    checkUserUpdateInput,
} = require("../Validation/UserDataRules");

const {
    inputValidationMiddleware,
} = require("../Validation/ValidationMiddleware");

const {
    userAuthorizationHandler,
} = require("../Middleware/UserAuthorizationMiddleware");

// User management routes
UserRouter.route("/")
    .get(userAuthorizationHandler(1), getAllUser)
    .delete(userAuthorizationHandler(1), deleteAllUser);

// Authentication routes
UserRouter.post("/register",
    clientPlatform,
    checkRegisterInput,
    inputValidationMiddleware,
    addUser
);

UserRouter.post("/login",
    clientPlatform,
    checkLoginInput,
    inputValidationMiddleware,
    loginUser
);

UserRouter.get("/me",
    clientPlatform,
    userAuthorizationHandler(3),
    getMe
);

UserRouter.get("/logout",
    clientPlatform,
    logOut
);

// User profile update
UserRouter.patch("/update",
    clientPlatform,
    userAuthorizationHandler(1,2,3),
    express.json(),
    checkUserUpdateInput,
    inputValidationMiddleware,
    updateUser
);

// User management by ID
UserRouter.route("/:id")
    .get(userAuthorizationHandler(1), getSingleUser)
    .delete(userAuthorizationHandler(1), deleteUser);

module.exports = UserRouter;