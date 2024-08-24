import express from "express";
import { createUser } from "../controllers/userController.js";
import { upload } from "../Middlewares/multer.middlewere.js";

const router = express.Router();

router.post("/register", upload.fields([
    { name: "avatar", maxCount: 1 }
]), createUser);

export default router;
