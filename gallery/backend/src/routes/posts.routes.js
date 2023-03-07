import { Router } from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/post.controller.js';
const router = Router();

router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/:id', getPost);

export default router;