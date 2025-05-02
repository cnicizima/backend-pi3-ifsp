import { list } from "../../models/pedidoModels.js";

export default async function listPedidoController(req, res, next) {
  try {
    // Busca todos os pedidos
    const result = await list();

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhum pedido encontrado.",
      });
    }

    return res.status(200).json({
      message: "Pedidos listados com sucesso.",
      pedidos: result,
    });
  } catch (error) {
    next(error);
  }
}