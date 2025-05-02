import { getById } from "../../models/pedidoProdutoModels.js";

export default async function getPedidoProdutoController(req, res, next) {
  try {
    const { idPedidoProduto } = req.params;

    if (!idPedidoProduto || isNaN(+idPedidoProduto)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Busca o PedidoProduto pelo ID
    const result = await getById(+idPedidoProduto);

    if (!result) {
      return res.status(404).json({
        message: "PedidoProduto não encontrado.",
      });
    }

    return res.status(200).json({
      message: "PedidoProduto encontrado com sucesso.",
      pedidoProduto: result,
    });
  } catch (error) {
    next(error);
  }
}