import express from 'express'
import getUserController from '../controllers/users/getUserController.js';
import listUserController from '../controllers/users/listUserController.js';    
import createUserController from '../controllers/users/createUserController.js';
import updateUserController from '../controllers/users/updateUserController.js';
import deleteUserController from '../controllers/users/deleteUSerController.js';

const router = express.Router();

router.get('/:id', getUserController);
router.get('/', listUserController);
router.post('/', createUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;