import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/test", (req, res) => {
    res.send("hello world");
});

import userRouter from "./Routes/user.router.js";
import projectRouter from "./Routes/poject.router.js"
// Routing
app.use("/api/v1/users", userRouter); // Use userRouter for user-related routes
app.use("./api/v1/project",projectRouter)

export default app;
