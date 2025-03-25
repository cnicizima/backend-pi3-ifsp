import { list } from '../../models/favoritoModels.js';

export default async function listFavoritoController(req, res) {
  const result = await list();

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao listar favoritos',
    });
  }

  return res.status(200).json(result);
}
