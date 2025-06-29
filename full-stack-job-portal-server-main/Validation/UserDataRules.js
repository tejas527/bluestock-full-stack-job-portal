const { check } = require("express-validator");

exports.checkRegisterInput = [
    check("username").trim().notEmpty().withMessage("Username is required"),

    check("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),

    check("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password is too short (min 8)"),
];

exports.checkLoginInput = [
    check("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),

    check("password").trim().notEmpty().withMessage("Password is required"),
];

exports.checkGoogleAuthInput = [
    check("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
    check("google_uid").trim().notEmpty().withMessage("Google UID is required"),
];

exports.checkUserUpdateInput = [
    check("username").trim(),
    check("email").trim(),
    check("location").trim(),
    check("gender").trim(),
    check("role").trim(),
    check("resume").trim(),
    check("dob").optional().isDate().withMessage("Invalid date format"),
    check("preference").optional().isInt({ min: 1, max: 3 }).withMessage("Preference must be 1, 2, or 3")
];