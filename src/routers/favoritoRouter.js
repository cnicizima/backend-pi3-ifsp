import express from 'express';
import createFavoritoController from '../controllers/favoritos/createFavoritoController.js';
import listFavoritoController from '../controllers/favoritos/listFavoritoController.js';
import getFavoritoController from '../controllers/favoritos/getFavoritoController.js';
import updateFavoritoController from '../controllers/favoritos/updateFavoritoController.js';
import deleteFavoritoController from '../controllers/favoritos/deleteFavoritoController.js';

const router = express.Router();

router.get('/', listFavoritoController);
router.get('/:id', getFavoritoController);
router.post('/', createFavoritoController);
router.put('/:id', updateFavoritoController);
router.delete('/:id', deleteFavoritoController);

export default router;
