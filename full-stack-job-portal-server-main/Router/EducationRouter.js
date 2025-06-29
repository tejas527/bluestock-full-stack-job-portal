const express = require("express");
const EducationRouter = express.Router();
const {
    addEducationRecord,
    getUserEducation,
    updateEducationRecord,
    deleteEducationRecord
} = require("../Controller/EducationController");
const { clientPlatform } = require("../Middleware/clientPlatform");
const {
    userAuthorizationHandler,
} = require("../Middleware/UserAuthorizationMiddleware");
const {
    checkEducationInput,
} = require("../Validation/EducationDataRules");
const {
    inputValidationMiddleware,
} = require("../Validation/ValidationMiddleware");

EducationRouter.use((req, res, next) => {
  console.log(`[EDU-ROUTER] ${req.method} ${req.path}`);
  next();
});

EducationRouter.route("/")
    .get(
        clientPlatform,
        userAuthorizationHandler(3),
        getUserEducation
    )
    .post(
        clientPlatform,
        userAuthorizationHandler(3),
        express.json(),
        checkEducationInput,
        inputValidationMiddleware,
        addEducationRecord
    );

EducationRouter.route("/:id")
    .patch(
        clientPlatform,
        userAuthorizationHandler(3),
        express.json(),
        checkEducationInput,
        inputValidationMiddleware,
        updateEducationRecord
    )
    .delete(
        clientPlatform,
        userAuthorizationHandler(3),
        deleteEducationRecord
    );

module.exports = EducationRouter;