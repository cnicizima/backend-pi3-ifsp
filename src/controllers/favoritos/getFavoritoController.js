import { getById } from '../../models/favoritoModels.js';

export default async function getFavoritoController(req, res) {
  const { idFavorito } = req.params;

  const result = await getById(+idFavorito);

  if (!result) {
    return res.status(404).json({
      message: 'Favorito não encontrado',
    });
  }

  return res.status(200).json(result);
}
