import { remove } from "../../models/pedidoModels.js";

export default async function deletePedidoController(req, res) {
  try {
    const { idPedido } = req.params;

    if (!idPedido || isNaN(+idPedido)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Remoção do pedido
    const result = await remove(+idPedido);

    if (!result) {
      return res.status(404).json({
        message: "Pedido não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Pedido removido com sucesso.",
      pedido: result,
    });
  } catch (err) {
    console.error("Erro ao deletar pedido:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}