import { list } from '../../models/cupomModels.js';

export default async function listCupomController(req, res) {
  const result = await list();

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao listar cupons',
    });
  }

  return res.status(200).json(result);
}
