import { remove, produtoValidator } from "../../models/produtoModels.js";

export default async function deleteProdutoController(req, res) {
  try {
    const { idProduto } = req.params;

    // Validação do ID do produto
    const { success, error } = produtoValidator({ idProduto: +idProduto });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar o ID do produto!",
        errors: error,
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
    // Captura e trata erros inesperados
    console.error("Erro ao remover produto:", err);
    return res.status(500).json({
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    });
  }
}
