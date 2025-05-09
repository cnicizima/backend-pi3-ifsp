import { remove } from "../../models/estoqueModels.js";

export default async function deleteEstoqueController(req, res, next) {
  try {
    const { idEstoque } = req.params;

    if (!idEstoque || isNaN(+idEstoque)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Remoção do estoque
    const result = await remove(Number(idEstoque));

    if (!result) {
      return res.status(404).json({
        error: "Estoque não encontrado",
      });
    }

    return res.status(200).json({
      message: "Estoque removido com sucesso",
      estoque: result,
    });
  } catch (error) {
    next(error);
  }
}