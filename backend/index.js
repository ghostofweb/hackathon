import dotenv from "dotenv" // although we cant use it directly , we have to make some changes in script
import mongoose from "mongoose"
import connectDB from "./Config/index.js";
import app from "./app.js";


dotenv.config({
    path:'../.env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT|| 8000,()=>{
        console.log("server is running on port",process.env.PORT)
    }) 
})
.catch((err)=>{
    console.log("MONGODB CONNECTION FAILED!!! ",err)
})