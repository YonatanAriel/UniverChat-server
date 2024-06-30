import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadPhoto = async (filePath: string) => {
  const result = await cloudinary.uploader.upload(filePath);
  const photoUrl = result.secure_url;
  await fs.promises.unlink(filePath);
  return photoUrl;
};
