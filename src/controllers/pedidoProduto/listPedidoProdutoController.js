import { list } from "../../models/pedidoProdutoModels.js";

export default async function listPedidoProdutoController(req, res) {
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
  } catch (err) {
    console.error("Erro ao listar PedidoProdutos:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}