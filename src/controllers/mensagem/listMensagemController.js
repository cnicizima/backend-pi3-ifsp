import { list } from '../../models/mensagemModels.js';

export default async function listMensagemController(req, res) {
  const result = await list();

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao listar mensagens',
    });
  }

  return res.status(200).json(result);
}
