import {
  getById,
  pedidoProdutoValidator,
} from "../../models/pedidoProdutoModels.js";

export default async function getPedidoProdutoController(req, res) {
  try {
    const { idPedidoProduto } = req.params;

    // Validação do ID do PedidoProduto
    const parsedId = parseInt(idPedidoProduto, 10); // Converte para número inteiro
    const { success, error } = pedidoProdutoValidator({
      idPedidoProduto: parsedId,
    });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar o ID do PedidoProduto!",
        errors: error,
      });
    }

    // Busca o PedidoProduto pelo ID
    const result = await getById(parsedId);

    if (!result) {
      return res.status(404).json({
        message: "PedidoProduto não encontrado.",
      });
    }

    return res.status(200).json({
      message: "PedidoProduto encontrado com sucesso.",
      pedidoProduto: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao buscar PedidoProduto:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
