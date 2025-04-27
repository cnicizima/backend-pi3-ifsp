import { update, avaliacaoValidator } from "../../models/avaliacaoModels.js";

export default async function updateAvaliacaoController(req, res) {
  try {
    const { idAvaliacao } = req.params;
    const avaliacao = req.body;

    // Validação do ID da avaliação
    if (!idAvaliacao || isNaN(+idAvaliacao)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados da avaliação
    const { success, error } = avaliacaoValidator(avaliacao);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados da avaliação!",
        errors: error.flatten().fieldErrors,
      });
    }

    // Atualização da avaliação
    const result = await update(+idAvaliacao, avaliacao);

    if (!result) {
      return res.status(404).json({
        message: "Avaliação não encontrada.",
      });
    }

    return res.status(200).json({
      message: "Avaliação atualizada com sucesso.",
      avaliacao: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao atualizar avaliação:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
