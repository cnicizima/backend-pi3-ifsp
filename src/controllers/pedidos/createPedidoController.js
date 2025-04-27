import { create, pedidoValidator } from "../../models/pedidoModels.js";

export default async function createPedidoController(req, res) {
  try {
    const pedido = req.body;

    // Validação dos dados do pedido
    const { success, error } = pedidoValidator(pedido);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do pedido!",
        errors: error,
      });
    }

    // Criação do pedido
    const result = await create(pedido);

    if (!result) {
      return res.status(500).json({
        message: "Erro ao criar pedido",
      });
    }

    return res.status(201).json({
      message: "Pedido criado com sucesso",
      pedido: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao criar pedido:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
