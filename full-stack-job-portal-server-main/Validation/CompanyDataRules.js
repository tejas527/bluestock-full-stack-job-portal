const { check } = require("express-validator");

exports.checkCompanyRegisterInput = [
  check("company_name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),

  check("company_email")
    .trim()
    .notEmpty()
    .withMessage("Company email is required")
    .isEmail()
    .withMessage("Invalid company email"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  // Optional fields
  check("organization_type").optional().isIn([
    "solo proprietor",
    "pvt LTD",
    "LTD",
    "OPC",
    "LLP",
    "INC",
    "Corporation",
  ]).withMessage("Invalid organization type"),

  check("industry_type").optional().isIn([
    "Fintech",
    "Engineering",
    "Software & IT",
    "Edutech",
    "Oil and Gas",
    "Other",
  ]).withMessage("Invalid industry type"),

  check("team_size").optional().isIn([
    "1-10",
    "10-50",
    "50-100",
    "100-300",
    "300-1000",
    "2000-10000",
  ]).withMessage("Invalid team size"),

  check("year_of_establishment")
    .optional()
    .isInt({ min: 1800, max: new Date().getUTCFullYear() })
    .withMessage("Year of establishment must be a valid year"),
];

exports.checkCompanyLoginInput = [
  check("company_email")
    .trim()
    .notEmpty()
    .withMessage("Company email is required")
    .isEmail()
    .withMessage("Invalid company email"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required"),
];

exports.checkCompanyUpdateInput = [
  check("company_name").optional().trim(),
  check("company_logo_url").optional().isURL().withMessage("Invalid logo URL"),
  check("company_banner_url").optional().isURL().withMessage("Invalid banner URL"),
  check("about_company").optional().trim(),
  check("organization_type").optional().isIn([
    "solo proprietor",
    "pvt LTD",
    "LTD",
    "OPC",
    "LLP",
    "INC",
    "Corporation",
  ]),
  check("industry_type").optional().isIn([
    "Fintech",
    "Engineering",
    "Software & IT",
    "Edutech",
    "Oil and Gas",
    "Other",
  ]),
  check("team_size").optional().isIn([
    "1-10",
    "10-50",
    "50-100",
    "100-300",
    "300-1000",
    "2000-10000",
  ]),
  check("year_of_establishment").optional().isInt({ min: 1800 }),
  check("company_website").optional().isURL(),
  check("company_app_link").optional().isURL(),
  check("map_location_url").optional().isURL(),
  check("headquarter_phone").optional().isMobilePhone().withMessage("Invalid phone number"),
  check("contact_email").optional().isEmail().withMessage("Invalid contact email"),
  check("social_links").optional().isObject().withMessage("social_links must be a JSON object"),
];
