import { getById, mensagemValidator } from "../../models/mensagemModels.js";

export default async function getMensagemController(req, res) {
  try {
    const { idMensagem } = req.params;

    // Validação do ID da mensagem
    const { success, error } = mensagemValidator({
      idMensagem: Number(idMensagem),
    });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar o ID da mensagem!",
        errors: error,
      });
    }

    // Busca a mensagem pelo ID
    const result = await getById(Number(idMensagem));

    if (!result) {
      return res.status(404).json({
        message: "Mensagem não encontrada.",
      });
    }

    return res.status(200).json({
      message: "Mensagem encontrada com sucesso.",
      mensagem: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao buscar mensagem:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
