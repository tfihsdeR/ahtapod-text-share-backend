import express from 'express';
import {
    createUser,
    readUserByEmail,
    deleteUserByEmail,
    readUserById,
    readAllUsers,
    deleteUserById,
    updateUser,
} from '../controllers/user';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/userAuthentication';

const router = express.Router();

router.post('/user/create', createUser);
router.get('/user/readByEmail/:email', readUserByEmail);

// Authenticated routes
router.route('/user/readById/:id').get(isAuthenticatedUser, readUserById);
router.route('/user/deleteById/:id').delete(isAuthenticatedUser, deleteUserById);
router.route('/user/deleteByEmail/:email').delete(isAuthenticatedUser, deleteUserByEmail);
router.route('/user/update').put(isAuthenticatedUser, updateUser);

// Admin routes
router.route('/user/readAll').get(isAuthenticatedUser, authorizeRoles('admin'), readAllUsers);

export default router;