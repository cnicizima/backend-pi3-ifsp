import { getById } from "../../models/produtoModels.js";

export default async function getProdutoController(req, res, next) {
  try {
    const { idProduto } = req.params;

    // Validação do ID do produto
    if (!idProduto || isNaN(+idProduto)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Busca o produto pelo ID
    const result = await getById(+idProduto);

    if (!result) {
      return res.status(404).json({
        message: "Produto não encontrado.",
      });
    }

    return res.status(200).json({
      produto: result,
    });
  } catch (error) {
    next(error)
  }
}