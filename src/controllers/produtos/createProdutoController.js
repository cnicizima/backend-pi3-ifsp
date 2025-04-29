import { create, produtoValidator } from "../../models/produtoModels.js";

export default async function createProdutoController(req, res) {
  try {
    const produto = req.body;

    // Validação dos dados do produto
    const validation = produtoValidator(produto);

    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do produto!",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    // Salvar o produto no banco
    const result = await create(validation.data);

    return res.status(201).json({
      message: "Produto criado com sucesso",
      produto: result,
    });
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
      error: err.message,
    });
  }
}