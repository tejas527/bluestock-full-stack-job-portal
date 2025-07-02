const { pool } = require("../Utils/DBconnect");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const JWTGenerator = require("../Utils/JWTGenerator");
const { findOrCreateGoogleUser } = require("../Model/UserModel");

const isProd = process.env.NODE_ENV === "production";

// GET all users (excluding password)
const getAllUser = async (req, res, next) => {
    try {
        const { rows } = await pool.query("SELECT id, username, email, location, gender, role, resume FROM users");
        if (rows.length) {
            res.status(200).json({ status: true, result: rows });
        } else {
            next(createError(200, "User list is empty"));
        }
    } catch (error) {
        next(createError(500, error.message));
    }
};

// GET single user by ID
const getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT id, username, email, location, gender, role, resume FROM users WHERE id = $1", [id]);
        
        if (rows.length === 0) {
            return next(createError(404, "User not found"));
        }

        res.status(200).json({ status: true, result: rows[0] });
    } catch (error) {
        next(createError(500, error.message));
    }
};

// GET current user info
const getMe = async (req, res, next) => {
    try {
        if (!req.user) return next(createError(401, "Please login first"));
        // Get fresh data including new fields
        const { rows } = await pool.query(
            "SELECT id, username, email, location, full_name, profile_photo, gender, role, resume, dob, preference FROM users WHERE id = $1",
            [req.user.id]
        );
        res.status(200).json({
            status: true,
            platform: req.clientPlatform, 
            result: rows[0],
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

const googleAuth = async (req, res, next) => {
    try {
        let { email, google_uid, full_name = "Google User", profile_photo = null, signup_type = "g" } = req.body;

        if (!email || !google_uid) {
            return next(createError(400, "Email and Google UID are required"));
        }

        // Normalize email
        email = email.trim().toLowerCase();

        const googleUser = { email, full_name, profile_photo, google_uid };

        // findOrCreate logic handled in model
        const user = await findOrCreateGoogleUser(googleUser);

        const tokenObj = { ID: user.id, role: user.role };
        const token = JWTGenerator(tokenObj);
        const threeMonths = 1000 * 60 * 60 * 24 * 90;

        res.cookie(process.env.COOKIE_NAME, token, {
            expires: new Date(Date.now() + threeMonths),
            secure: isProd,
            httpOnly: true,
            signed: true,
            sameSite: isProd ? "None" : "Lax",
        });

        console.log(`[GOOGLE_AUTH] Platform: ${req.clientPlatform} | Email: ${email} | UID: ${google_uid}`);

        res.status(200).json({
            status: true,
            message: "Google authentication successful",
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                profile_photo: user.profile_photo,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("[GOOGLE_AUTH_ERROR]", error);
        next(createError(500, "Google authentication failed"));
    }
};

const logOut = async (req, res, next) => {
    try {
        res.cookie(process.env.COOKIE_NAME, "", {
            sameSite: isProd ? "None" : "Lax",
            secure: isProd,
            httpOnly: true,
            expires: new Date(0),
            path: "/",
        }).status(200).json({ status: true, message: "Logout done" });
    } catch (error) {
        next(createError(500, error.message));
    }
};

// Register user
const addUser = async (req, res, next) => {
    const data = req.body;
    try {
        const { rows: existing } = await pool.query("SELECT * FROM users WHERE email = $1", [data.email]);
        if (existing.length) return next(createError(409, "Email already exists"));

        const hashedPassword = await bcrypt.hash(data.password, 16);
        
        const { rowCount } = await pool.query("SELECT COUNT(*) FROM users");
        const role = rowCount === 0 ? 1 : 3; 
        await pool.query(
            `INSERT INTO users (
                full_name, 
                username, 
                email, 
                password, 
                role,  
                location, 
                gender, 
                resume, 
                signup_type
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
                data.full_name, 
                data.username, 
                data.email, 
                hashedPassword, 
                role,  
                data.location, 
                data.gender, 
                data.resume || null, 
                data.signup_type || 'e'
            ]
        );

        console.log(`[REGISTER] Platform: ${req.clientPlatform} | Email: ${data.email}`);

        res.status(200).json({ status: true, message: "Registered Successfully" });
    } catch (error) {
        next(createError(500, error.message));
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = rows[0];
        if (!user) return next(createError(404, "User not found"));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(createError(401, "Email or password not matched"));

        const tokenObj = { ID: user.id, role: user.role };
        const token = JWTGenerator(tokenObj);
        const threeMonths = 1000 * 60 * 60 * 24 * 90; // 3 months in milliseconds

        res.cookie(process.env.COOKIE_NAME, token, {
            expires: new Date(Date.now() + threeMonths),
            secure: isProd,
            httpOnly: true,
            signed: true,
            sameSite: isProd ? "None" : "Lax",
        });

        console.log(`[LOGIN] Platform: ${req.clientPlatform} | Email: ${email}`);

        // 5. Return token in JSON response
        res.status(200).json({ 
            status: true,
            message: "Login Successfully",
            token, // Bearer token for API requests
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                full_name: user.full_name
            }
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

// Update user
const updateUser = async (req, res, next) => {
    const data = req.body;
    try {
        if (req?.user?.email !== data?.email) return next(createError(403, "You have no permission to update"));

        // Only allow preference and dob updates for regular users (role=3)
        let updateFields = {
            username: data.username,
            location: data.location,
            gender: data.gender,
            resume: data.resume,
            updated_at: 'NOW()'
        };

        // Only add these fields if user is regular user (not admin/recruiter)
        if (req.user.role === 3) {
            updateFields.dob = data.dob || null;
            updateFields.preference = data.preference || null;
        }

        const setClause = Object.keys(updateFields)
            .map((key, i) => `${key}=$${i + 1}`)
            .join(', ');

        const values = Object.values(updateFields);

        await pool.query(
            `UPDATE users SET ${setClause} WHERE email=$${values.length + 1}`,
            [...values, data.email]
        );

        const { rows: updatedUser } = await pool.query(
            "SELECT id, username, email, location, gender, role, resume, dob, preference FROM users WHERE email=$1", 
            [data.email]
        );

        res.status(200).json({ status: true, message: "Profile Updated", result: updatedUser[0] });
    } catch (error) {
        next(createError(500, error.message));
    }
};

// Delete a user
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        if (!rowCount) return next(createError(404, "User not found"));
        res.status(200).json({ status: true, message: "User Deleted" });
    } catch (error) {
        next(createError(500, error.message));
    }
};

// Delete all users
const deleteAllUser = async (req, res, next) => {
    try {
        await pool.query("DELETE FROM users");
        res.status(200).json({ status: true, message: "All users deleted" });
    } catch (error) {
        next(createError(500, error.message));
    }
};

module.exports = {
    getAllUser,
    getSingleUser,
    getMe,
    logOut,
    addUser,
    loginUser,
    updateUser,
    deleteUser,
    deleteAllUser,
    googleAuth
};