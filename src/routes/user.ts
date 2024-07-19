import express from 'express';
import {
    createUser,
    readUserByEmail,
    deleteUserByEmail,
    checkUser,
    readUserById,
    testFunc
} from '../controllers/user';

const router = express.Router();

router.post('/user/create', createUser);
router.get('/user/readByEmail/:email', readUserByEmail);
router.get('/user/readById/:id', readUserById);
router.delete('/user/deleteByEmail/:email', deleteUserByEmail);

router.get('/user/check', checkUser);
router.get('/user/test/:email', testFunc);


export default router;