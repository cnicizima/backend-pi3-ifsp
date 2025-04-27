import { create, produtoValidator } from "../../models/produtoModels.js";

export default async function createProdutoController(req, res) {
  try {
    const produto = req.body;

    // Validação dos dados do produto
    const { success, error } = produtoValidator(produto);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do produto!",
        errors: error,
      });
    }

    const result = await create(produto);

    if (!result) {
      return res.status(500).json({
        message: "Erro ao criar produto",
      });
    }

    delete result.pass; // Para não enviar a senha no JSON de retorno

    return res.status(201).json({
      message: "Produto criado com sucesso",
      produto: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao criar produto:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
