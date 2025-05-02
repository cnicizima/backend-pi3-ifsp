import { create, pedidoValidator } from "../../models/pedidoModels.js";

export default async function createPedidoController(req, res, next) {
  try {
    const pedido = req.body;

    // Validação dos dados do pedido
    const validation = pedidoValidator.safeParse(pedido);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do pedido!",
        errors: validation.error.format(),
      });
    }

    // Criação do pedido
    const result = await create(validation.data);

    return res.status(201).json({
      message: "Pedido criado com sucesso",
      pedido: result,
    });
  } catch (error) {
    next(error);
  }
}