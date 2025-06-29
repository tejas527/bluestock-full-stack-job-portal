const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
    origin: "https://job-portal-client-seven-pi.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "X-Client-Platform", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

const { authenticateUser } = require("./Middleware/UserAuthenticationMiddleware");
const { clientPlatform } = require("./Middleware/clientPlatform");

app.use(clientPlatform); 

const JobRouter = require("./Router/JobRouter");
const UserRouter = require("./Router/UserRouter");
const AuthRouter = require("./Router/AuthRouter");
const AdminRouter = require("./Router/AdminRouter");
const ApplicationRouter = require("./Router/ApplicationRouter");
const EducationRouter = require("./Router/EducationRouter");

app.use("/api/jobs", authenticateUser, JobRouter);
app.use("/api/users", authenticateUser, UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/admin", authenticateUser, AdminRouter);
app.use("/api/application", authenticateUser, ApplicationRouter);
app.use("/api/education", authenticateUser, EducationRouter);

module.exports = app;
