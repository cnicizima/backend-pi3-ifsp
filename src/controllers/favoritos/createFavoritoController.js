import { create } from '../../models/favoritoModels.js';

export default async function createFavoritoController(req, res) {
  const favorito = req.body;

  const result = await create(favorito);

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao adicionar favorito',
    });
  }

  return res.status(201).json({
    message: 'Favorito adicionado com sucesso',
    favorito: result,
  });
}
