import { getById } from "../../models/pedidoProdutoModels.js";

export default async function getPedidoProdutoController(req, res) {
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
  } catch (err) {
    console.error("Erro ao buscar PedidoProduto:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}