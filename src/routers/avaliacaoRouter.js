import express from 'express';
import createAvaliacaoController from '../controllers/avaliacao/createAvaliacaoController.js';
import listAvaliacaoController from '../controllers/avaliacao/listAvaliacaoController.js';
import getAvaliacaoController from '../controllers/avaliacao/getAvaliacaoController.js';
import updateAvaliacaoController from '../controllers/avaliacao/updateAvaliacaoController.js';
import deleteAvaliacaoController from '../controllers/avaliacao/deleteAvaliacaoController.js';

const router = express.Router();

router.get('/', listAvaliacaoController);
router.get('/:idAvaliacao', getAvaliacaoController);
router.post('/', createAvaliacaoController);
router.put('/:idAvaliacao', updateAvaliacaoController);
router.delete('/:idAvaliacao', deleteAvaliacaoController);

// Catch-all para rotas não implementadas
router.all('*', (req, res) => {
    res.status(501).json({
      message: 'Not implemented',
    });
  });
  
export default router;
