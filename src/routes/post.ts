import express from 'express';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/userAuthentication';
import {
    createPost
} from '../controllers/post';

const router = express.Router();

// router.route('/post').post(isAuthenticatedUser, createPost);
router.route('/post/create').post(isAuthenticatedUser, authorizeRoles('admin'), createPost);

export default router;