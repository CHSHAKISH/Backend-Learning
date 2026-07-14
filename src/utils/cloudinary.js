import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

// import fs from "fs": Imports Node.js’s native File System module. 
// You do not need to install this; it is built straight into Node.js. 
// It allows your backend to read, write, or delete files directly 
// on your server storage.

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // Upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // File uploaded successfully
        // console.log("File uploaded successfully ", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temp file as the upload operation got failed
        return null;
    }
}

export { uploadOnCloudinary }


