import express from 'express';
import listPagamentoController from '../controllers/pagamentos/listPagamentoController.js';
import createPagamentoController from '../controllers/pagamentos/createPagamentoController.js';
import getPagamentoController from '../controllers/pagamentos/getPagamentoController.js';
import deletePagamentoController from '../controllers/pagamentos/deletePagamentoController.js';
import updatePagamentoController from '../controllers/pagamentos/updatePagamentoController.js';

const router = express.Router();

router.get('/', listPagamentoController);
router.get('/:idPagamento', getPagamentoController);
router.post('/', createPagamentoController);
router.put('/:idPagamento', updatePagamentoController);
router.delete('/:idPagamento', deletePagamentoController);

export default router;
