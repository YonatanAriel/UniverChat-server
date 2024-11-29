import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadPhoto = async (filePath: string) => {
  reconfigureCloudinary();
  checkIfFileExists(filePath);
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "your_folder_name",
  });
  await fs.promises.unlink(filePath);
  return result.secure_url;
};

const reconfigureCloudinary = () => {
  const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  };

  cloudinary.config(cloudinaryConfig);
};

const checkIfFileExists = async (filePath: string) => {
  try {
    await fs.promises.access(filePath);
    console.log("File exists and is accessible");
  } catch (fileError) {
    console.error("File access error:", fileError);
    throw new Error("File does not exist or is not accessible");
  }
};
