import { list } from "../../models/pedidoProdutoModels.js";

export default async function listPedidoProdutoController(req, res, next) {
  try {
    // Busca todos os PedidoProdutos
    const result = await list();

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhum PedidoProduto encontrado.",
      });
    }

    return res.status(200).json({
      message: "PedidoProdutos listados com sucesso.",
      pedidoProdutos: result,
    });
  } catch (error) {
    next(error);
  }
}