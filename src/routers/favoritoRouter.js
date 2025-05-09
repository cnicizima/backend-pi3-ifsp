import express from 'express';
import createFavoritoController from '../controllers/favoritos/createFavoritoController.js';
import listFavoritoController from '../controllers/favoritos/listFavoritoController.js';
import getFavoritoController from '../controllers/favoritos/getFavoritoController.js';
import updateFavoritoController from '../controllers/favoritos/updateFavoritoController.js';
import deleteFavoritoController from '../controllers/favoritos/deleteFavoritoController.js';
import notFoundController from '../notFoundController.js';

const router = express.Router();

router.get('/', listFavoritoController);
router.get('/:idFavorito', getFavoritoController);
router.post('/', createFavoritoController);
router.put('/:idFavorito', updateFavoritoController);
router.delete('/:idFavorito', deleteFavoritoController);

// Catch-all para rotas não implementadas
router.all('*', notFoundController);
  
export default router;
