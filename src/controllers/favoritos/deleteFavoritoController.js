import { remove } from '../../models/favoritoModels.js';

export default async function deleteFavoritoController(req, res) {
  const { idFavorito } = req.params;

  const result = await remove(+idFavorito);

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao remover favorito',
    });
  }

  return res.status(200).json({
    message: 'Favorito removido com sucesso',
    favorito: result,
  });
}
