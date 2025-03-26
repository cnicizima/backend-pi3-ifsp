import { remove } from '../../models/avaliacaoModels.js';

export default async function deleteAvaliacaoController(req, res) {
  const { idAvaliacao } = req.params;

  const result = await remove(+idAvaliacao);

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao remover avaliação',
    });
  }

  return res.status(200).json({
    message: 'Avaliação removida com sucesso',
    avaliacao: result,
  });
}
