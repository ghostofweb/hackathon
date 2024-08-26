import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const createUser = asyncHandler(async (req, res) => {
    console.log(req.body); // Log the incoming request body
    const { username, password, email, role } = req.body;
    if (!username || !password || !email || !role) {
        throw new Error('Please fill all the fields');
    }


    // Validate role


    // Check if the user already exists with the given username or email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(400, "Username or Email already taken");
    }

    let avatarUrl = 'https://www.nationalgeographic.com/animals/mammals/facts/domestic-dog'; // Default avatar URL

    // If the user uploads an avatar, update the avatarUrl
    const avatarLocalPath = req.file?.path;


    // Create new user instance and save
    const user = new User({
        username,
        password,
        email,
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

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!(email || username)) {
        throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (!user) {
        throw new ApiError(400, "Username or email is incorrect");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true, // Makes the cookie accessible only by the server
        secure: process.env.NODE_ENV === "production", // Only set secure flag in production
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            status: 200,
            data: {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            message: "User logged in successfully"
        });
});

const logoutUser = asyncHandler(async(req,res)=>{
    // here we are removing the cookies from the user's browser
   await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{refreshToken: 1} //unsetting the token  
        },
        {
            new:true
        }
    )
    const options = {
        httpOnly: true, // making httponly true give access to the server only to change the cookie cuz cookies can be changed from the url
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User Logged Out"))
})

const refreshAccessToken = asyncHandler(async(req,res) =>{
    const incomngRefreshToken =  req.cookies.refreshToken || req.body.refreshToken
 
    if(!incomngRefreshToken) {
     throw new ApiError(401,"Unauthorized request")
    }
    try {
     const decodedToken = jwt.verify(incomngRefreshToken,process.env.REFRESH_TOKEN_SECRET)
  
     const user = await User.findById(decodedToken?._id)
  
     if(!user) {
      throw new ApiError(401,"Invalid refresh token")
     }
  
     if(incomngRefreshToken !== user?.refreshToken){
      throw new ApiError(401,"Refresh Token is expired or user")
     }
  
     const options = {
      httpOnly: true, // making httponly true give access to the server only to change
      secure:true     
     }
  
     const {newRefreshToken,accessToken} = await generateAccessAndRefreshTokens(user._id)
  
     return res.status(200)
     .cookie("accessToken",accessToken,options)
     .cookie("refreshToken",newRefreshToken,options)
     .json(
      new ApiResponse(200,{accessToken,refreshToken:newRefreshToken},"Access Token Refreshed")
     )
    } catch (error) {
         throw new ApiError(401, error?.message || "Invalid refresh token")
    }
 
 })
 const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body //taking old and new password
    const user = await User.findById(req.user?._id)
    //finding the user by getting the userId from auth
    //logically if user can change the password then surely it is logged in
    //so here we use the auth req.user where we got the user by taking cookie from the 
    //user
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400,"Invalid old password")
    }

    user.password = newPassword
    //changing the password of the user
    await user.save({validateBeforeSave:false}) //now save again 

    return res.status(200).json(new ApiResponse(200,{},"password changed successfully"))
})

const getCurrentUser = asyncHandler(async (req,res) => {
    return res
    .status(200)
    .json(new ApiResponse(200,req.user,"current user fetched successfully"))
})


const updateAccountDetails = asyncHandler(async (req, res) => {
    const { username, email } = req.body;

    // Check if at least one field is provided
    if (!username && !email) {
        throw new ApiError(400, "Please provide at least one field to update");
    }

    // Build the update object based on provided fields
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;

    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set: updateFields
        }, { new: true }
    ).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"));
});


const updateUserAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    // Fetch the user to get the current avatar URL
    const user = await User.findById(req.user?._id).select("avatar");

    // If the user has an existing avatar, delete it from Cloudinary
    if (user.avatar) {
        const publicId = getPublicIdFromUrl(user.avatar); // Extract public ID from URL
        await deleteFromCloudinary(publicId); // Delete the avatar from Cloudinary
    }

    // Upload the new avatar to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading avatar");
    }

    // Update the user document with the new avatar URL
    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password");

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedUser, "Avatar image updated successfully")
        );
});

// Helper function to extract public ID from Cloudinary URL
function getPublicIdFromUrl(url) {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    return fileName.split('.')[0]; // Remove the file extension to get the public ID
}

// Helper function to delete a file from Cloudinary
async function deleteFromCloudinary(publicId) {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    if (result.result !== 'ok') {
        throw new ApiError(400, "Failed to delete old avatar from Cloudinary");
    }
}
export { createUser,
     generateAccessAndRefreshTokens,
     loginUser,
     refreshAccessToken,
     changeCurrentPassword,
     getCurrentUser,
     updateAccountDetails
    ,updateUserAvatar,
     logoutUser
};
