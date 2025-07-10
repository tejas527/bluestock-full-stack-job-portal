    const { pool } = require("../Utils/DBconnect");
    const createError = require("http-errors");
    const bcrypt = require("bcrypt");
    const JWTGenerator = require("../Utils/JWTGenerator");
    const { hashCompanyPassword } = require("../Model/CompanyModel");

    const isProd = process.env.NODE_ENV === "production";

    // Company Registration
    const registerCompany = async (req, res, next) => {
        const data = req.body;

        try {
            const { rows: existing } = await pool.query(
                "SELECT * FROM company_profile WHERE company_email = $1",
                [data.company_email]
            );

            if (existing.length) return next(createError(409, "Email already exists"));

            const hashedPassword = await hashCompanyPassword(data.password);

            await pool.query(
                `INSERT INTO company_profile (
                    full_name,
                    company_email,
                    password,
                    company_name,
                    role,
                    company_logo_url,
                    company_banner_url,
                    about_company,
                    organization_type,
                    industry_type,
                    team_size,
                    year_of_establishment,
                    company_website,
                    company_app_link,
                    company_vision,
                    map_location_url,
                    headquarter_phone,
                    contact_email,
                    social_links
                ) VALUES (
                    $1,$2,$3,$4,$5,
                    $6,$7,$8,$9,$10,
                    $11,$12,$13,$14,$15,
                    $16,$17,$18,$19
                )`,
                [
                    data.full_name,
                    data.company_email,
                    hashedPassword,
                    data.company_name,
                    data.role || "recruiter",
                    data.company_logo_url,
                    data.company_banner_url,
                    data.about_company,
                    data.organization_type,
                    data.industry_type,
                    data.team_size,
                    data.year_of_establishment,
                    data.company_website,
                    data.company_app_link,
                    data.company_vision,
                    data.map_location_url,
                    data.headquarter_phone,
                    data.contact_email,
                    data.social_links || {}
                ]
            );


            console.log(`[COMPANY REGISTER] ${data.company_email}`);
            res.status(201).json({ status: true, message: "Company registered successfully" });
        } catch (error) {
            next(createError(500, error.message));
        }
    };

    // Company Login
    const loginCompany = async (req, res, next) => {
        const { company_email, password } = req.body;

        try {
            const { rows } = await pool.query("SELECT * FROM company_profile WHERE company_email = $1", [company_email]);
            const company = rows[0];

            if (!company) return next(createError(404, "Company not found"));

            const isMatch = await bcrypt.compare(password, company.password);
            if (!isMatch) return next(createError(401, "Invalid credentials"));

            const token = JWTGenerator({ ID: company.id, role: company.role });

            res.cookie(process.env.COOKIE_NAME, token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
                secure: isProd,
                httpOnly: true,
                signed: true,
                sameSite: isProd ? "None" : "Lax",
            });

            console.log(`[COMPANY LOGIN] ${company_email}`);
            res.status(200).json({
                status: true,
                message: "Login successful",
                company: {
                    id: company.id,
                    email: company.company_email,
                    name: company.company_name,
                    role: company.role
                }
            });
        } catch (error) {
            next(createError(500, error.message));
        }
    };

    // Get current logged-in company's profile
    const getMyCompanyProfile = async (req, res, next) => {
        try {
            const companyId = req?.user?.ID;

            if (!companyId) return next(createError(401, "Unauthorized - missing company ID"));

            const { rows } = await pool.query(
                "SELECT * FROM company_profile WHERE id = $1",
                [companyId]
            );

            if (!rows.length) return next(createError(404, "Company not found"));

            res.status(200).json({ status: true, result: rows[0] });
        } catch (error) {
            next(createError(500, error.message));
        }
    };



    // View all companies
    const getAllCompanies = async (req, res, next) => {
        try {
            const { rows } = await pool.query("SELECT id, company_name, company_logo_url, industry_type, team_size FROM company_profile");
            res.status(200).json({ status: true, result: rows });
        } catch (error) {
            next(createError(500, error.message));
        }
    };

    // Get full company details by ID
    const getCompanyById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { rows } = await pool.query("SELECT * FROM company_profile WHERE id = $1", [id]);

            if (!rows.length) return next(createError(404, "Company not found"));
            res.status(200).json({ status: true, result: rows[0] });
        } catch (error) {
            next(createError(500, error.message));
        }
    };

    // Company Logout
    const logoutCompany = async (req, res, next) => {
        try {
            res.clearCookie(process.env.COOKIE_NAME, {
                httpOnly: true,
                secure: isProd,
                sameSite: isProd ? "None" : "Lax",
                signed: true,
            });

            console.log(`[COMPANY LOGOUT] ID=${req.user?.id || "unknown"}`);
            res.status(200).json({ status: true, message: "Logged out successfully" });
        } catch (error) {
            next(createError(500, error.message));
        }
    };


    module.exports = {
        registerCompany,
        loginCompany,
        getMyCompanyProfile,
        getAllCompanies,
        getCompanyById,
        logoutCompany
    };
