import express from 'express'
import getUserController from '../controllers/Users/getUserController.js';
import listUserController from '../controllers/Users/listUserController.js';    
import createUserController from '../controllers/Users/createUserController.js';
import updateUserController from '../controllers/Users/updateUserController.js';
import deleteUserController from '../controllers/Users/deleteUSerController.js';

const router = express.Router();

router.get('/:id', getUserController);
router.get('/', listUserController);
router.post('/', createUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;