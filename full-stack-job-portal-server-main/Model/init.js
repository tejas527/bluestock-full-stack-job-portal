const { createUserTable } = require('./UserModel');
const { createJobTable } = require('./JobModel');
const { createApplicationTable } = require('./ApplicationModel');
const { createEducationTable } = require('./EducationModel');

async function initializeDatabase() {
    await createUserTable();
    await createJobTable();
    await createApplicationTable();
    await createEducationTable();
    console.log("✅ All tables created successfully");
}

initializeDatabase().catch(console.error);