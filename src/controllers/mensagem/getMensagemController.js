import { getById } from '../../models/mensagemModels.js';

export default async function getMensagemController(req, res) {
  const { idMensagem } = req.params;

  const result = await getById(+idMensagem);

  if (!result) {
    return res.status(404).json({
      message: 'Mensagem não encontrada',
    });
  }

  return res.status(200).json(result);
}
