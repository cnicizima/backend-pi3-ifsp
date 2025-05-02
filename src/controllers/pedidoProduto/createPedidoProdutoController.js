import { create, pedidoProdutoValidator } from "../../models/pedidoProdutoModels.js";

export default async function createPedidoProdutoController(req, res, next) {
  try {
    const pedidoProduto = req.body;

    // Validação dos dados do PedidoProduto
    const validation = pedidoProdutoValidator.safeParse(pedidoProduto);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do PedidoProduto!",
        errors: validation.error.format(),
      });
    }

    // Criação do PedidoProduto
    const result = await create(validation.data);

    return res.status(201).json({
      message: "PedidoProduto criado com sucesso",
      pedidoProduto: result,
    });
  } catch (error) {
    next(error);
  }
}