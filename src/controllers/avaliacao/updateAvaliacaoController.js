import { update } from '../../models/avaliacaoModels.js';

export default async function updateAvaliacaoController(req, res) {
  const { idAvaliacao } = req.params;
  const avaliacao = req.body;

  const result = await update(+idAvaliacao, avaliacao);

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao atualizar avaliação',
    });
  }

  return res.status(200).json({
    message: 'Avaliação atualizada com sucesso',
    avaliacao: result,
  });
}
