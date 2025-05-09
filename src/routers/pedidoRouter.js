import express from 'express';
import getPedidoController from '../controllers/pedidos/getPedidoController.js';
import listPedidoController from '../controllers/pedidos/listPedidoController.js';
import createPedidoController from '../controllers/pedidos/createPedidoController.js';
import updatePedidoController from '../controllers/pedidos/updatePedidoController.js';
import deletePedidoController from '../controllers/pedidos/deletePedidoController.js';

const router = express.Router();

router.get('/:idPedido', getPedidoController);
router.get('/', listPedidoController);
router.post('/', createPedidoController);
router.put('/:idPedido', updatePedidoController);
router.delete('/:idPedido', deletePedidoController);

// Catch-all para rotas não implementadas
router.all('*', (req, res) => {
    res.status(501).json({
      message: 'Not implemented',
    });
  });
  
export default router;
