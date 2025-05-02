import { list } from "../../models/avaliacaoModels.js";

export default async function listAvaliacaoController(req, res, next) {
  try {
    // Busca todas as avaliações
    const result = await list();

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhuma avaliação encontrada.",
      });
    }

    return res.status(200).json({
      message: "Avaliações listadas com sucesso.",
      avaliacoes: result,
    });
  } catch (error) {
    next(error);
  }
}