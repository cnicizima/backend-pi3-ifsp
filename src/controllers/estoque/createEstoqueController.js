import { create, estoqueValidator } from "../../models/estoqueModels.js";

export default async function createEstoqueController(req, res) {
  try {
    const estoque = req.body;

    // Validação dos dados do estoque
    const validation = estoqueValidator.safeParse(estoque);

    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do estoque!",
        errors: validation.error.format(),
      });
    }

    // Criação do estoque
    const result = await create(validation.data);

    if (!result) {
      return res.status(500).json({
        message: "Erro ao criar estoque",
      });
    }

    return res.status(201).json({
      message: "Estoque criado com sucesso",
      estoque: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao criar estoque:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
