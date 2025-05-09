// tem que importar o express para usar o router, que é uma função do express
import express from 'express'
import signUpController from '../controllers/auth/signUpController.js'
import loginController from '../controllers/auth/loginController.js'
import notFoundController from '../notFoundController.js';

const router = express.Router();

router.post('/signup', signUpController);  
router.post('/login', loginController);

// Catch-all para rotas não implementadas
router.all('*', notFoundController);
  
export default router;  