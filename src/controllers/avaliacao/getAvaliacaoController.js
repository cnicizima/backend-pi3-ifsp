import { getById } from '../../models/avaliacaoModels.js';

export default async function getAvaliacaoController(req, res) {
  const { idAvaliacao } = req.params;

  const result = await getById(+idAvaliacao);

  if (!result) {
    return res.status(404).json({
      message: 'Avaliação não encontrada',
    });
  }

  return res.status(200).json(result);
}
