import { remove } from "../../models/mensagemModels.js";

export default async function deleteMensagemController(req, res, next) {
  try {
    const { idMensagem } = req.params;

    if (!idMensagem || isNaN(+idMensagem)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Remoção da mensagem
    const result = await remove(Number(idMensagem));

    if (!result) {
      return res.status(404).json({
        message: "Mensagem não encontrada.",
      });
    }

    return res.status(200).json({
      message: "Mensagem removida com sucesso.",
      mensagem: result,
    });
  } catch (error) {
    next(error);
  }
}