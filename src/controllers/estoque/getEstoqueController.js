import { getById } from "../../models/estoqueModels.js";

export default async function getEstoqueController(req, res, next) {
  try {
    const { idEstoque } = req.params;

    if (!idEstoque || isNaN(+idEstoque)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Busca o estoque pelo ID
    const result = await getById(Number(idEstoque));

    if (!result) {
      return res.status(404).json({
        message: "Estoque não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Estoque encontrado com sucesso.",
      estoque: result,
    });
  } catch (error) {
    next(error);
  }
}