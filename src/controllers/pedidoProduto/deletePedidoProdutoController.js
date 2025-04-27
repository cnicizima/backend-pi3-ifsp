import {
  remove,
  pedidoProdutoValidator,
} from "../../models/pedidoProdutoModels.js";

export default async function deletePedidoProdutoController(req, res) {
  try {
    const { idPedidoProduto } = req.params;

    // Validação do ID do PedidoProduto
    const { success, error } = pedidoProdutoValidator({
      idPedidoProduto: +idPedidoProduto,
    });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar o ID do PedidoProduto!",
        errors: error,
      });
    }

    // Remoção do PedidoProduto
    const result = await remove(+idPedidoProduto);

    if (!result) {
      return res.status(404).json({
        message: "PedidoProduto não encontrado.",
      });
    }

    return res.status(200).json({
      message: "PedidoProduto excluído com sucesso.",
      pedidoProduto: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao excluir PedidoProduto:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
