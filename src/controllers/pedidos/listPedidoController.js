import { list } from "../../models/pedidoModels.js";

export default async function listPedidoController(req, res) {
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
  } catch (err) {
    console.error("Erro ao listar pedidos:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}