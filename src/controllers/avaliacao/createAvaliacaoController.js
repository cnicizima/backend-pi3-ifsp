import { create, avaliacaoValidator } from "../../models/avaliacaoModels.js";

export default async function createAvaliacaoController(req, res) {
  try {
    const avaliacao = req.body;

    // Validação dos dados da avaliação
    const { success, error } = avaliacaoValidator(avaliacao);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados da avaliação!",
        errors: error.flatten().fieldErrors,
      });
    }

    // Criação da avaliação
    const result = await create(avaliacao);

    if (!result) {
      return res.status(500).json({
        message: "Erro ao criar avaliação",
      });
    }

    return res.status(201).json({
      message: "Avaliação criada com sucesso",
      avaliacao: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao criar avaliação:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
