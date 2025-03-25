import { update } from '../../models/favoritoModels.js';

export default async function updateFavoritoController(req, res) {
  const { idFavorito } = req.params;
  const favorito = req.body;

  const result = await update(idFavorito, favorito);

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao atualizar favorito',
    });
  }

  return res.status(200).json({
    message: 'Favorito atualizado com sucesso',
    favorito: result,
  });
}
