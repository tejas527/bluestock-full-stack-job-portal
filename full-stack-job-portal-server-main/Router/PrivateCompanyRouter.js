const express = require("express");
const PrivateCompanyRouter = express.Router();

const {
  getMyCompanyProfile,
  logoutCompany
} = require("../Controller/CompanyController");

const { clientPlatform } = require("../Middleware/clientPlatform");
const {
  authenticateCompany
} = require("../Middleware/CompanyAuthenticationMiddleware");
const {
  companyAuthorizationHandler
} = require("../Middleware/CompanyAuthorizationMiddleware");

// Authenticated routes only
PrivateCompanyRouter.use(authenticateCompany);

PrivateCompanyRouter.get(
  "/me",
  clientPlatform,
  companyAuthorizationHandler("recruiter", "admin"),
  getMyCompanyProfile
);

PrivateCompanyRouter.get(
  "/logout",
  clientPlatform,
  logoutCompany
);

module.exports = PrivateCompanyRouter;
