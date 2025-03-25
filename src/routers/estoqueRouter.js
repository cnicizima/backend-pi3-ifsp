import express from 'express';
import getEstoqueController from '../controllers/estoque/getEstoqueController.js';
import listEstoqueController from '../controllers/estoque/listEstoqueController.js';
import createEstoqueController from '../controllers/estoque/createEstoqueController.js';
import updateEstoqueController from '../controllers/estoque/updateEstoqueController.js';
import deleteEstoqueController from '../controllers/estoque/deleteEstoqueController.js';

const router = express.Router();

router.get('/:idEstoque', getEstoqueController);
router.get('/', listEstoqueController);
router.post('/', createEstoqueController);
router.put('/:idEstoque', updateEstoqueController);
router.delete('/:idEstoque', deleteEstoqueController);

export default router;
