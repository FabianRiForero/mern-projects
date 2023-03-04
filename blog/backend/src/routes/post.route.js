import { Router } from 'express';
import { addPost, deletePost, getPost, getPosts, updatePost } from '../controllers/post.controller.js';
const router = Router();

router.get('/', getPosts);
router.post('/', addPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;