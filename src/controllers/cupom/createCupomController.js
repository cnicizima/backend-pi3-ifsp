import { create } from '../../models/cupomModels.js';

export default async function createCupomController(req, res) {
  const cupom = req.body;

  const result = await create(cupom);

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao criar cupom',
    });
  }

  return res.status(201).json({
    message: 'Cupom criado com sucesso',
    cupom: result,
  });
}
