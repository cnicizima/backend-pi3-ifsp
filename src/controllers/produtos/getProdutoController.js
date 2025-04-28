import { getById, produtoValidator } from "../../models/produtoModels.js";

export default async function getProdutoController(req, res) {
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

    // Busca o produto pelo ID
    const result = await getById(+idProduto);

    if (!result) {
      return res.status(404).json({
        message: "Produto não encontrado.",
      });
    }

    return res.status(200).json({
      produto: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao buscar produto:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
