import { update, pedidoValidator } from "../../models/pedidoModels.js";

export default async function updatePedidoController(req, res) {
  try {
    const { idPedido } = req.params;
    const pedido = req.body;

    // Validação do ID do pedido
    if (!idPedido || isNaN(+idPedido)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados do pedido
    const { success, error } = pedidoValidator(pedido);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do pedido!",
        errors: error,
      });
    }

    // Atualização do pedido
    const result = await update(+idPedido, pedido);

    if (!result) {
      return res.status(404).json({
        message: "Pedido não encontrado ou não atualizado.",
      });
    }

    return res.status(200).json({
      message: "Pedido atualizado com sucesso.",
      pedido: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao atualizar pedido:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
