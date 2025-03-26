import { update } from '../../models/mensagemModels.js';

export default async function updateMensagemController(req, res) {
  const { idMensagem } = req.params;
  const mensagem = req.body;

  const result = await update(+idMensagem, mensagem);

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao atualizar mensagem',
    });
  }

  return res.status(200).json({
    message: 'Mensagem atualizada com sucesso',
    mensagem: result,
  });
}
