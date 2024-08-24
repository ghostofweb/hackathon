import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

console.log('Cloudinary Configuration:', {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // Upload the file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });
        // File has been uploaded to Cloudinary
        console.log('File is uploaded on Cloudinary', response.url);
        fs.unlinkSync(localFilePath); // Remove the local file
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Remove the local file if error occurs
        throw error; // Re-throw the error to handle it upstream
    }
};

export default uploadOnCloudinary; // Default export
