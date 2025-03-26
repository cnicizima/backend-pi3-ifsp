import { list } from '../../models/avaliacaoModels.js';

export default async function listAvaliacaoController(req, res) {
  const result = await list();

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao listar avaliações',
    });
  }

  return res.status(200).json(result);
}
