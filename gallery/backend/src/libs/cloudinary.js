import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

export const uploadImage = async filePath => await cloudinary.uploader.upload(filePath, { folder: 'posts' });

export const deleteImage = async id => await cloudinary.uploader.destroy(id);