import express from 'express';
import createCupomController from '../controllers/cupom/createCupomController.js';
import listCupomController from '../controllers/cupom/listCupomController.js';
import getCupomController from '../controllers/cupom/getCupomController.js';
import updateCupomController from '../controllers/cupom/updateCupomController.js';
import deleteCupomController from '../controllers/cupom/deleteCupomController.js';
import notFoundController from '../notFoundController.js';

const router = express.Router();

router.get('/', listCupomController);
router.get('/:idCupom', getCupomController);
router.post('/', createCupomController);
router.put('/:idCupom', updateCupomController);
router.delete('/:idCupom', deleteCupomController);

// Catch-all para rotas não implementadas
router.all('*', notFoundController);
  
export default router;
