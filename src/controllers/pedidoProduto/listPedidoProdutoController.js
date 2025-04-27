import {
  list,
  pedidoProdutoValidator,
} from "../../models/pedidoProdutoModels.js";

export default async function listPedidoProdutoController(req, res) {
  try {
    // Busca todos os PedidoProdutos
    const result = await list();

    // Valida se há PedidoProdutos
    const { success, error } = pedidoProdutoValidator({
      pedidoProdutos: result,
    });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os PedidoProdutos!",
        errors: error.flatten().fieldErrors,
      });
    }

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
    // Captura e trata erros inesperados
    console.error("Erro ao listar PedidoProdutos:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
