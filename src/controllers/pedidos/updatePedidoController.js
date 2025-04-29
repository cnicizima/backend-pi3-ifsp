import { update, pedidoValidator } from "../../models/pedidoModels.js";

export default async function updatePedidoController(req, res) {
  try {
    const { idPedido } = req.params;
    const pedido = req.body;

    if (!idPedido || isNaN(+idPedido)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados do pedido
    const validation = pedidoValidator.safeParse(pedido);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do pedido!",
        errors: validation.error.format(),
      });
    }

    // Atualização do pedido
    const result = await update(+idPedido, validation.data);

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
    console.error("Erro ao atualizar pedido:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}