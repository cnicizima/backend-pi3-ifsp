import express from 'express';
import listPedidoProdutoController from '../controllers/pedidoProduto/listPedidoProdutoController.js';
import getPedidoProdutoController from '../controllers/pedidoProduto/getPedidoProdutoController.js';
import createPedidoProdutoController from '../controllers/pedidoProduto/createPedidoProdutoController.js';
import updatePedidoProdutoController from '../controllers/pedidoProduto/updatePedidoProdutoController.js';
import deletePedidoProdutoController from '../controllers/pedidoProduto/deletePedidoProdutoController.js';
import notFoundController from '../notFoundController.js';

const router = express.Router();

router.get('/', listPedidoProdutoController);
router.get('/:idPedidoProduto', getPedidoProdutoController);
router.post('/', createPedidoProdutoController);
router.put('/:idPedidoProduto', updatePedidoProdutoController);
router.delete('/:idPedidoProduto', deletePedidoProdutoController);

// Catch-all para rotas não implementadas
router.all('*', notFoundController);
  
export default router;
