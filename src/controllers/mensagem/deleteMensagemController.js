import { remove } from '../../models/mensagemModels.js';

export default async function deleteMensagemController(req, res) {
  const { idMensagem } = req.params;

  const result = await remove(+idMensagem);

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao remover mensagem',
    });
  }

  return res.status(200).json({
    message: 'Mensagem removida com sucesso',
    mensagem: result,
  });
}
