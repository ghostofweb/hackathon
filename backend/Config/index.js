import mongoose from "mongoose";

// Ensure DB_NAME is defined before using it
const DB_NAME = "hack";  // You can move this line before using it or ensure it’s imported properly

const connectDB = async () => {
    try {
        // Use DB_NAME variable correctly after it's defined
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
};

export default connectDB;
