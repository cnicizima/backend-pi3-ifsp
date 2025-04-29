import { update, mensagemValidator } from "../../models/mensagemModels.js";

export default async function updateMensagemController(req, res) {
  try {
    const { idMensagem } = req.params;
    const mensagem = req.body;

    if (!idMensagem || isNaN(+idMensagem)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados da mensagem
    const validation = mensagemValidator.safeParse(mensagem);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados da mensagem!",
        errors: validation.error.format(),
      });
    }

    // Atualização da mensagem
    const result = await update(Number(idMensagem), validation.data);

    if (!result) {
      return res.status(404).json({
        message: "Mensagem não encontrada ou não atualizada.",
      });
    }

    return res.status(200).json({
      message: "Mensagem atualizada com sucesso.",
      mensagem: result,
    });
  } catch (err) {
    console.error("Erro ao atualizar mensagem:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}