import postService from '../services/post.service.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import { deleteImage, uploadImage } from '../libs/cloudinary.js';
import fs from 'fs-extra';

export const createPost = catchAsyncErrors(async ({ body, files }, res, next) => {
    const { title, description } = body;
    let image;
    if (files?.image) {
        const result = await uploadImage(files.image.tempFilePath);
        await fs.remove(files.image.tempFilePath);
        image = {
            url: result.secure_url,
            public_id: result.public_id
        }
    }
    const post = await postService.insertPost({ title, description, image });
    res.json(post);
});

export const deletePost = catchAsyncErrors(async ({ params }, res, next) => {
    const { id } = params;
    const existsPost = await postService.findPostById(id);
    if (!existsPost) return res.sendStatus(404);
    const post = await postService.removePostById(id);
    if (!post) return res.status(400).json(`Can't delete post`);
    if (JSON.parse(existsPost.image)?.public_id) {
        console.log('entre');
        await deleteImage(JSON.parse(existsPost.image)?.public_id);
    }
    res.sendStatus(204);
});

export const getPost = catchAsyncErrors(async ({ params }, res, next) => {
    const { id } = params;
    const post = await postService.findPostById(id);
    if (!post) return res.sendStatus(404);
    res.status(200).json(post);
});

export const getPosts = catchAsyncErrors(async (req, res, next) => {
    const posts = await postService.findAllPosts();
    res.status(200).json(posts);
});

export const updatePost = catchAsyncErrors(async ({ body, params }, res, next) => {
    const { id } = params;
    const { title, description, image } = body;
    const existsPost = await postService.findPostById(id);
    if (!existsPost) return res.status(404).json('Post not found!');
    const post = await postService.updatePostById(id, { title, description, image });
    if (!post[0]) return res.status(400).json(`Can't update post`);
    const postUpdated = await postService.findPostById(id);
    res.status(200).json(postUpdated);
});