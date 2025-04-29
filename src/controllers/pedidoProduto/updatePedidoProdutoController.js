import { update, pedidoProdutoValidator } from "../../models/pedidoProdutoModels.js";

export default async function updatePedidoProdutoController(req, res) {
  try {
    const { idPedidoProduto } = req.params;
    const pedidoProduto = req.body;

    if (!idPedidoProduto || isNaN(+idPedidoProduto)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados do PedidoProduto
    const validation = pedidoProdutoValidator.safeParse(pedidoProduto);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do PedidoProduto!",
        errors: validation.error.format(),
      });
    }

    // Atualização do PedidoProduto
    const result = await update(+idPedidoProduto, validation.data);

    if (!result) {
      return res.status(404).json({
        message: "PedidoProduto não encontrado ou não atualizado.",
      });
    }

    return res.status(200).json({
      message: "PedidoProduto atualizado com sucesso.",
      pedidoProduto: result,
    });
  } catch (err) {
    console.error("Erro ao atualizar PedidoProduto:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
