import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { upload } from "../Middlewares/multer.middlewere.js";

const router = express.Router();

// Register route
router.post("/register", upload.fields([{ name: "avatar", maxCount: 1 }]), createUser);

// Login route
router.post("/login", loginUser);

export default router;
