import { create, mensagemValidator } from "../../models/mensagemModels.js";

export default async function createMensagemController(req, res) {
  try {
    const mensagem = req.body;

    // Validação dos dados da mensagem
    const { success, error } = mensagemValidator(mensagem);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados da mensagem!",
        errors: error,
      });
    }

    // Criação da mensagem
    const result = await create(mensagem);

    if (!result) {
      return res.status(500).json({
        message: "Erro ao criar mensagem",
      });
    }

    return res.status(201).json({
      message: "Mensagem criada com sucesso",
      mensagem: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao criar mensagem:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
