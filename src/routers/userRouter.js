import express from 'express'
import getUserController from '../controllers/users/getUserController.js';
import listUserController from '../controllers/users/listUserController.js';    
import updateUserController from '../controllers/users/updateUserController.js';
import deleteUserController from '../controllers/users/deleteUserController.js';

const router = express.Router();

router.get('/:id', getUserController);
router.get('/', listUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

//rota post para criar user é via auth/signup

export default router;