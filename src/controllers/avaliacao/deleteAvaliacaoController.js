import { remove, avaliacaoValidator } from "../../models/avaliacaoModels.js";

export default async function deleteAvaliacaoController(req, res) {
  try {
    const { idAvaliacao } = req.params;

    // Validação do ID da avaliação
    const { success, error } = avaliacaoValidator({
      idAvaliacao: Number(idAvaliacao),
    });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar o ID da avaliação!",
        errors: error.flatten().fieldErrors,
      });
    }

    // Remoção da avaliação
    const result = await remove(Number(idAvaliacao));

    if (!result) {
      return res.status(404).json({
        message: "Avaliação não encontrada.",
      });
    }

    return res.status(200).json({
      message: "Avaliação removida com sucesso.",
      avaliacao: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao remover avaliação:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
