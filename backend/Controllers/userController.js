import { User } from "../Models/userModel.js";
import asyncHandler from "../Utils/asyncHandler.js";
import ApiError from "../Utils/ApiError.js";
import uploadOnCloudinary from "../Utils/cloudinary.js";

const createUser = asyncHandler(async (req, res) => {
    const { username, password, email, role } = req.body;

    if ([email, username, password, role].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Please fill all the fields");
    }

    if (!['Student', 'Professional'].includes(role)) {
        throw new ApiError(400, "Invalid role specified");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(400, "Username or Email already taken");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // Create new user instance and save
    const user = new User({
        username,
        email,
        password,
        avatar: avatar?.url,
        role
    });

    await user.save();

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json({
        status: 200,
        data: createdUser,
        message: "User registered successfully"
    });
});

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.error(`User with ID ${userId} not found`);
            throw new ApiError(404, "User not found");
        }

        console.log("User found:", user);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        console.log("Generated Access Token:", accessToken);
        console.log("Generated Refresh Token:", refreshToken);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error.message, error.stack);
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

export { createUser, generateAccessAndRefreshTokens };
