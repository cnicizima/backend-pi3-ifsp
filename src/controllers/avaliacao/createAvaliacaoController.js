import { create } from '../../models/avaliacaoModels.js';

export default async function createAvaliacaoController(req, res) {
  const avaliacao = req.body;

  const result = await create(avaliacao);

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao criar avaliação',
    });
  }

  return res.status(201).json({
    message: 'Avaliação criada com sucesso',
    avaliacao: result,
  });
}
