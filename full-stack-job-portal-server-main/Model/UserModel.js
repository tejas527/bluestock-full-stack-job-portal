const { pool } = require("../Utils/DBconnect");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(16);
    return bcrypt.hash(password, salt);
}

async function createUserTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100),
            email VARCHAR(255) UNIQUE NOT NULL,
            password TEXT,
            full_name VARCHAR(255),
            profile_photo TEXT,
            google_uid VARCHAR(255) UNIQUE,
            signup_type VARCHAR(1) DEFAULT 'e' CHECK (signup_type IN ('g', 'e', 'm')),
            location TEXT,
            gender TEXT,
            role INTEGER DEFAULT 3 CHECK (role IN (1, 2, 3)),
            resume TEXT,
            dob DATE,  
            preference INTEGER CHECK (preference IN (1, 2, 3)),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    await pool.query(query);
}

// Helper to find or create Google user
async function findOrCreateGoogleUser(googleUser) {
    const { email, full_name, profile_photo, google_uid } = googleUser;
    
    const { rows: existingByGoogle } = await pool.query(
        "SELECT * FROM users WHERE google_uid = $1", 
        [google_uid]
    );
    
    if (existingByGoogle.length) {
        return existingByGoogle[0];
    }

    const { rows: existingByEmail } = await pool.query(
        "SELECT * FROM users WHERE email = $1", 
        [email]
    );
    
    if (existingByEmail.length) {
        await pool.query(
            "UPDATE users SET google_uid = $1, signup_type = 'g', full_name = $2, profile_photo = $3 WHERE email = $4",
            [google_uid, full_name, profile_photo, email]
        );
        return existingByEmail[0];
    }

    const { rowCount } = await pool.query("SELECT COUNT(*) FROM users");
    const role = rowCount === 0 ? 1 : 3; 

    const { rows: newUser } = await pool.query(
        `INSERT INTO users 
        (email, full_name, profile_photo, google_uid, signup_type, role, dob, preference) 
        VALUES ($1, $2, $3, $4, 'g', $5, NULL, NULL) 
        RETURNING *`,
        [email, full_name, profile_photo, google_uid, role]
    );

    return newUser[0];
}

module.exports = {
    createUserTable,
    hashPassword,
    findOrCreateGoogleUser
};