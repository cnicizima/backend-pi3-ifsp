import express from 'express';
import listProdutoController from '../controllers/produtos/listProdutoController.js';
import createProdutoController from '../controllers/produtos/createProdutoController.js';
import getProdutoController from '../controllers/produtos/getProdutoController.js';
import deleteProdutoController from '../controllers/produtos/deleteProdutoController.js';
import updateProdutoController from '../controllers/produtos/updateProdutoController.js';  
import notFoundController from '../notFoundController.js'; 

const router = express.Router();


router.get('/', listProdutoController);
router.get('/:idProduto', getProdutoController);
router.post('/', createProdutoController);
router.put('/:idProduto', updateProdutoController);
router.delete('/:idProduto', deleteProdutoController);

// Catch-all para rotas não implementadas
router.all('*', notFoundController);
  

export default router;