import { create } from '../../models/mensagemModels.js';

export default async function createMensagemController(req, res) {
  const mensagem = req.body;

  const result = await create(mensagem);

  if (!result) {
    return res.status(500).json({
      message: 'Erro ao criar mensagem',
    });
  }

  return res.status(201).json({
    message: 'Mensagem criada com sucesso',
    mensagem: result,
  });
}
