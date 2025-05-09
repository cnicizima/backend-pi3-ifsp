// tem que importar o express para usar o router, que é uma função do express
import express from 'express'
import signUpController from '../controllers/auth/signUpController.js'
import loginController from '../controllers/auth/loginController.js'

const router = express.Router();

router.post('/signup', signUpController);  
router.post('/login', loginController);

// Catch-all para rotas não implementadas
router.all('*', (req, res) => {
    res.status(501).json({
      message: 'Not implemented',
    });
  });
  
export default router;  