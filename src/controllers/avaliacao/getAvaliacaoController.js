import { getById } from "../../models/avaliacaoModels.js";

export default async function getAvaliacaoController(req, res, next) {
  try {
    const { idAvaliacao } = req.params;

    if (!idAvaliacao || isNaN(+idAvaliacao)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Busca a avaliação pelo ID
    const result = await getById(+idAvaliacao);

    if (!result) {
      return res.status(404).json({
        message: "Avaliação não encontrada.",
      });
    }

    return res.status(200).json({
      message: "Avaliação encontrada com sucesso.",
      avaliacao: result,
    });
  } catch (error) {
    next(error);
  }
}