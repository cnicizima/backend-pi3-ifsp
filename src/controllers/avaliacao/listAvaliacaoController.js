import { list, avaliacaoValidator } from "../../models/avaliacaoModels.js";

export default async function listAvaliacaoController(req, res) {
  try {
    // Busca todas as avaliações
    const result = await list();

    // Valida se há avaliações
    const { success, error } = avaliacaoValidator({ avaliacoes: result });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar as avaliações!",
        errors: error.flatten().fieldErrors,
      });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhuma avaliação encontrada.",
      });
    }

    return res.status(200).json({
      message: "Avaliações listadas com sucesso.",
      avaliacoes: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao listar avaliações:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
