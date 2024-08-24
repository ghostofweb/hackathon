import User from "../Models/userModel.js";
import asyncHandler from "../Middlewares/asynchandler.js";
import bcrypt from "bcryptjs"

const createUser = asyncHandler(async (req, res) => {
    const { username, password, email,userInterest } = req.body;

    if (!username || !email || !password || !userInterest) {
        throw new Error("please fill all the input.")
    }

    const userExists = await User.findOne({ email })
    if (userExists) res.status(400).send("User already exists")
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    
    const newUser = new User({ username, email, password:hashedPassword, userInterest })
    try {
        await newUser.save()
        res.status(201).json({_id:newUser._id,email:newUser.email,username:newUser.username,password:newUser._id, userInterest:newUser.userInterest})
    } catch (error) {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

export {createUser}