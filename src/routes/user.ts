import express from 'express';
import {
    createUser,
    readUserByEmail,
    deleteUserByEmail,
    checkUser,
    readUserById,
    testFunc
} from '../controllers/user';
import { isAuthenticatedUser } from '../middlewares/userAuthentication';

const router = express.Router();

router.post('/user/create', createUser);
router.delete('/user/deleteByEmail/:email', deleteUserByEmail);

router.get('/user/check', checkUser);
router.get('/user/test/:email', testFunc);

router.get('/user/readByEmail/:email', readUserByEmail);
router.route('/user/readById/:id').get(isAuthenticatedUser, readUserById);



export default router;