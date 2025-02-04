import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            return null;
        }
        // Upload file on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });
        // File has been uploaded successfully.
        console.log("file is uploaded on cloudinary", response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null; 
    }
}
const uploadOnCloudinary2 = async (localFilePath) => {
    try {
        if(!localFilePath){
            return null;
        }
        const response2 = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type : "auto"
            }
        )
        console.log("File is uploaded on cloudinary");
        return response2;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("Upload on cloudinary failed");
    }
}






