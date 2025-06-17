import express from 'express';
import getPedidoController from '../controllers/pedidos/getPedidoController.js';
import listPedidoController from '../controllers/pedidos/listPedidoController.js';
import createPedidoController from '../controllers/pedidos/createPedidoController.js';
import updatePedidoController from '../controllers/pedidos/updatePedidoController.js';
import deletePedidoController from '../controllers/pedidos/deletePedidoController.js';
import notFoundController from '../notFoundController.js';

const router = express.Router();

router.get('/', getPedidoController);
router.get('/list', listPedidoController);
router.post('/', createPedidoController);
router.put('/:idPedido', updatePedidoController);
router.delete('/:idPedido', deletePedidoController);

// Catch-all para rotas não implementadas
router.all('*', notFoundController);
  
export default router;
