import { update } from '../../models/cupomModels.js';

export default async function updateCupomController(req, res) {
  const { idCupom } = req.params;
  const cupom = req.body;

  const result = await update(+idCupom, cupom);

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao atualizar cupom',
    });
  }

  return res.status(200).json({
    message: 'Cupom atualizado com sucesso',
    cupom: result,
  });
}
