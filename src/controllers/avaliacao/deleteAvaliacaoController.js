import { remove } from "../../models/avaliacaoModels.js";

export default async function deleteAvaliacaoController(req, res, next) {
  try {
    const { idAvaliacao } = req.params;

    if (!idAvaliacao || isNaN(+idAvaliacao)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Remoção da avaliação
    const result = await remove(+idAvaliacao);

    if (!result) {
      return res.status(404).json({
        message: "Avaliação não encontrada.",
      });
    }

    return res.status(200).json({
      message: "Avaliação removida com sucesso.",
      avaliacao: result,
    });
  } catch (error) {
    next(error);
  }
}