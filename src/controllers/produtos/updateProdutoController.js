import { update, produtoValidator } from "../../models/produtoModels.js";

export default async function updateProdutoController(req, res) {
  try {
    const { idProduto } = req.params;
    const produto = req.body;

    // Validação do ID do produto
    if (!idProduto || isNaN(+idProduto)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados do produto
    const { success, error } = produtoValidator(produto);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do produto!",
        errors: error,
      });
    }

    // Atualização do produto
    const result = await update(+idProduto, produto);

    if (!result) {
      return res.status(404).json({
        message: "Produto não encontrado ou não atualizado.",
      });
    }

    return res.status(200).json({
      message: "Produto atualizado com sucesso.",
      produto: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao atualizar produto:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
