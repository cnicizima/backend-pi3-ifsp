import {
  create,
  pedidoProdutoValidator,
} from "../../models/pedidoProdutoModels.js";

export default async function createPedidoProdutoController(req, res) {
  try {
    const pedidoProduto = req.body;

    // Validação dos dados do PedidoProduto
    const { success, error } = pedidoProdutoValidator(pedidoProduto);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do PedidoProduto!",
        errors: error,
      });
    }

    // Criação do PedidoProduto
    const result = await create(pedidoProduto);

    if (!result) {
      return res.status(500).json({
        message: "Erro ao criar PedidoProduto",
      });
    }

    return res.status(201).json({
      message: "PedidoProduto criado com sucesso",
      pedidoProduto: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao criar PedidoProduto:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
