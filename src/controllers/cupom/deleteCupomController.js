import { remove } from '../../models/cupomModels.js';

export default async function deleteCupomController(req, res) {
  const { idCupom } = req.params;

  const result = await remove(idCupom);

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao remover cupom',
    });
  }

  return res.status(200).json({
    message: 'Cupom removido com sucesso',
    cupom: result,
  });
}
