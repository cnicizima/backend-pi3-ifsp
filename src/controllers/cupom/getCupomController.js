import { getById } from '../../models/cupomModels.js';

export default async function getCupomController(req, res) {
  const { idCupom } = req.params;

  const result = await getById(idCupom);

  if (!result) {
    return res.status(404).json({
      message: 'Cupom não encontrado',
    });
  }

  return res.status(200).json(result);
}
