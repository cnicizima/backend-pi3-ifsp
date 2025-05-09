import express from 'express'
import getUserController from '../controllers/users/getUserController.js';
import listUserController from '../controllers/users/listUserController.js';    
import updateUserController from '../controllers/users/updateUserController.js';
import deleteUserController from '../controllers/users/deleteUSerController.js';
import notFoundController from '../notFoundController.js';

const router = express.Router();

router.get('/:id', getUserController);
router.get('/', listUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

//rota post para criar user é via auth/signup

// Catch-all para rotas não implementadas
router.all('*', notFoundController);
  
export default router;