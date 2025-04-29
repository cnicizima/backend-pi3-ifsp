import { remove } from "../../models/produtoModels.js";

export default async function deleteProdutoController(req, res) {
  try {
    const { idProduto } = req.params;

    // Validação do ID do produto
    if (!idProduto || isNaN(+idProduto)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Tenta remover o produto pelo ID
    const result = await remove(+idProduto);

    if (!result) {
      return res.status(404).json({
        message: "Produto não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Produto removido com sucesso.",
      produto: result,
    });
  } catch (err) {
    console.error("Erro ao remover produto:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}