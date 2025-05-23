import { getById } from "../../models/pedidoModels.js";

export default async function getPedidoController(req, res, next) {
  try {
    const { idPedido } = req.params;

    if (!idPedido || isNaN(+idPedido)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Busca o pedido pelo ID
    const result = await getById(+idPedido);

    if (!result) {
      return res.status(404).json({
        message: "Pedido não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Pedido encontrado com sucesso.",
      pedido: result,
    });
  } catch (error) {
    next(error);
  }
}