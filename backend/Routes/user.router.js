import express from 'express';
import {
    createUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
} from '../Controllers/user.controller.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', createUser); // Registration route
router.post('/login', loginUser);     // Login route

// Protected routes
router.post('/logout', verifyJWT, logoutUser); // Logout route
router.post('/refresh-token', refreshAccessToken); // Refresh token route

router.patch('/change-password', verifyJWT, changeCurrentPassword); // Change password route
router.get('/current-user', verifyJWT, getCurrentUser); // Get current user details
router.patch('/update-account', verifyJWT, updateAccountDetails); // Update account details
router.patch('/update-avatar', verifyJWT,upload.single("avatar"), updateUserAvatar); // Update user avatar

export default router;
