const express = require("express");
const PublicCompanyRouter = express.Router();

const {
  registerCompany,
  loginCompany,
  getAllCompanies,
  getCompanyById
} = require("../Controller/CompanyController");

const { clientPlatform } = require("../Middleware/clientPlatform");
const {
  inputValidationMiddleware
} = require("../Validation/ValidationMiddleware");

const {
  checkCompanyRegisterInput,
  checkCompanyLoginInput
} = require("../Validation/CompanyDataRules");

// Public routes
PublicCompanyRouter.get("/", getAllCompanies);

PublicCompanyRouter.post(
  "/register",
  clientPlatform,
  checkCompanyRegisterInput,
  inputValidationMiddleware,
  registerCompany
);

PublicCompanyRouter.post(
  "/login",
  clientPlatform,
  checkCompanyLoginInput,
  inputValidationMiddleware,
  loginCompany
);

PublicCompanyRouter.get("/:id", getCompanyById);

module.exports = PublicCompanyRouter;
