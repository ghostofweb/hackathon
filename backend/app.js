import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Test route
app.get("/test", (req, res) => {
    res.send("hello world");
});

// Import routes
import userRouter from "./Routes/user.router.js";
import projectRouter from "./Routes/project.router.js"; // Fixed typo in path
import fileRoutes from './Routes/file.router.js';
import changeRequestRoutes from './Routes/changeRequest.routes.js'; // Import change request routes

// Routing
app.use("/api/v1/users", userRouter); // Use userRouter for user-related routes
app.use("/api/v1/projects", projectRouter); // Fixed route path for projects
app.use('/api/files', fileRoutes);
app.use('/api/v1/change-requests', changeRequestRoutes); // Add route for change requests

export default app;
