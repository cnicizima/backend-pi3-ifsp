import express from 'express';
import createCupomController from '../controllers/cupom/createCupomController.js';
import listCupomController from '../controllers/cupom/listCupomController.js';
import getCupomController from '../controllers/cupom/getCupomController.js';
import updateCupomController from '../controllers/cupom/updateCupomController.js';
import deleteCupomController from '../controllers/cupom/deleteCupomController.js';

const router = express.Router();

router.get('/', listCupomController);
router.get('/:id', getCupomController);
router.post('/', createCupomController);
router.put('/:id', updateCupomController);
router.delete('/:id', deleteCupomController);

export default router;
