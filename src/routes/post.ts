import express from 'express';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/userAuthentication';
import {
    createPost,
    readAllPosts,
    readPostById,
    removePostById,
    updatePostById,
} from '../controllers/post';

const router = express.Router();

// router.route('/post').post(isAuthenticatedUser, createPost);
router.route('/post/create').post(isAuthenticatedUser, createPost);
router.route('/post/readAll').get(readAllPosts);
router.route('/post/readById/:id').get(readPostById);
router.route('/post/removeById/:id').delete(isAuthenticatedUser, removePostById);
router.route('/post/updateById/:id').put(isAuthenticatedUser, updatePostById);

export default router;