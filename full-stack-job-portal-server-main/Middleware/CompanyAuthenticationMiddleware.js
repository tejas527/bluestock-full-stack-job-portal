const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { pool } = require("../Utils/DBconnect");

exports.authenticateCompany = async (req, res, next) => {
  const token = req.signedCookies[process.env.COOKIE_NAME];

  if (!token) {
    return next(createHttpError(401, "Unauthorized Company - Token missing"));
  }

  try {
    const { ID, role } = jwt.verify(token, process.env.JWT_SECRET);

    const result = await pool.query(
      "SELECT id, company_email, company_name, role FROM company_profile WHERE id = $1 AND role = $2",
      [ID, role]
    );

    if (result.rows.length === 0) {
      return next(createHttpError(401, "Unauthorized Company - No matching record"));
    }

    // Explicitly assign what you expect downstream
    req.user = {
      ID: result.rows[0].id,
      role: result.rows[0].role,
      email: result.rows[0].company_email,
      name: result.rows[0].company_name,
    };

    next();
  } catch (err) {
    console.error("[AUTH ERROR]", err.message);
    return next(createHttpError(401, "Unauthorized Company - Invalid token"));
  }
};
