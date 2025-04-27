import { list, mensagemValidator } from "../../models/mensagemModels.js";

export default async function listMensagemController(req, res) {
  try {
    // Busca todas as mensagens
    const result = await list();

    // Valida se há mensagens
    const { success, error } = mensagemValidator({ mensagens: result });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar as mensagens!",
        errors: error.flatten().fieldErrors,
      });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhuma mensagem encontrada.",
      });
    }

    return res.status(200).json({
      message: "Mensagens listadas com sucesso.",
      mensagens: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao listar mensagens:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
