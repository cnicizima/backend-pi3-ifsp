import { getById, avaliacaoValidator } from "../../models/avaliacaoModels.js";

export default async function getAvaliacaoController(req, res) {
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

    // Busca a avaliação pelo ID
    const result = await getById(Number(idAvaliacao));

    if (!result) {
      return res.status(404).json({
        message: "Avaliação não encontrada.",
      });
    }

    return res.status(200).json({
      message: "Avaliação encontrada com sucesso.",
      avaliacao: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao buscar avaliação:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
