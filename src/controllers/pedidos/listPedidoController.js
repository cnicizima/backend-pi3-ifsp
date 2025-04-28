import { list, pedidoValidator } from "../../models/pedidoModels.js";

export default async function listPedidoController(req, res) {
  try {
    // Busca todos os pedidos
    const result = await list();

    // Valida se há pedidos
    const { success, error } = pedidoValidator({ pedidos: result });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os pedidos!",
        errors: error.flatten().fieldErrors,
      });
    }

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
    // Captura e trata erros inesperados
    console.error("Erro ao listar pedidos:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
