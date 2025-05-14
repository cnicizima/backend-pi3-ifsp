import express from 'express';
import createEnderecoController from '../controllers/enderecos/createEnderecoController.js';
import listEnderecoController from '../controllers/enderecos/listEnderecoController.js';
import getEnderecoController from '../controllers/enderecos/getEnderecoController.js';
import deleteEnderecoController from '../controllers/enderecos/deleteEnderecoController.js';
import updateEnderecoController from '../controllers/enderecos/updateEnderecoController.js';
import notFoundController from '../notFoundController.js';

const router = express.Router();

router.post('/', createEnderecoController);
router.get('/', listEnderecoController);
router.get('/:idEndereco', getEnderecoController);
router.delete('/:idEndereco', deleteEnderecoController);
router.put('/:idEndereco', updateEnderecoController);

// Catch-all para rotas não implementadas
router.all('*', notFoundController);
  
export default router;