"use strict";
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPhoto = void 0;
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });
// export const uploadPhoto = async (filePath: string) => {
//   console.log("here!", process.env.CLOUDINARY_NAME);
//   const result = await cloudinary.uploader.upload(filePath);
//   const photoUrl = result.secure_url;
//   await fs.promises.unlink(filePath);
//   return photoUrl;
// };
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const uploadPhoto = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    reconfigureCloudinary();
    checkIfFileExists(filePath);
    const result = yield cloudinary_1.v2.uploader.upload(filePath, {
        folder: "your_folder_name",
    });
    yield fs_1.default.promises.unlink(filePath);
    return result.secure_url;
});
exports.uploadPhoto = uploadPhoto;
const reconfigureCloudinary = () => {
    const cloudinaryConfig = {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
    };
    cloudinary_1.v2.config(cloudinaryConfig);
};
const checkIfFileExists = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.default.promises.access(filePath);
        console.log("File exists and is accessible");
    }
    catch (fileError) {
        console.error("File access error:", fileError);
        throw new Error("File does not exist or is not accessible");
    }
});
