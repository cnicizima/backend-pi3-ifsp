import { remove, pedidoValidator } from "../../models/pedidoModels.js";

export default async function deletePedidoController(req, res) {
  try {
    const { idPedido } = req.params;

    // Validação do ID do pedido
    const { success, error } = pedidoValidator({ idPedido: +idPedido });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar o ID do pedido!",
        errors: error,
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
    // Captura e trata erros inesperados
    console.error("Erro ao deletar pedido:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
