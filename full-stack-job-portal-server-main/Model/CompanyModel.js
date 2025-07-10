const { pool } = require("../Utils/DBconnect");
const bcrypt = require("bcrypt");

// Hash password
async function hashCompanyPassword(password) {
    const salt = await bcrypt.genSalt(16);
    return bcrypt.hash(password, salt);
}

// Create company if not exists
async function createCompanyTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS company_profile (
            id SERIAL PRIMARY KEY,
            full_name TEXT NOT NULL,
            company_email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255),
            role role_type NOT NULL DEFAULT 'recruiter',
            company_logo_url TEXT,
            company_banner_url TEXT,
            company_name VARCHAR(255) NOT NULL,
            about_company TEXT,
            organization_type organization_type,
            industry_type industry_type,
            team_size team_size,
            year_of_establishment INTEGER,
            company_website TEXT,
            company_app_link TEXT,
            company_vision TEXT,
            social_links JSONB DEFAULT '{}'::jsonb,
            map_location_url TEXT,
            headquarter_phone VARCHAR(20),
            contact_email VARCHAR(255)
        );
    `;
    await pool.query(query);
}

module.exports = {
    hashCompanyPassword,
    createCompanyTable
};
