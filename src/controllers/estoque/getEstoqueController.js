import { getById, estoqueValidator } from "../../models/estoqueModels.js";

export default async function getEstoqueController(req, res) {
  try {
    const { idEstoque } = req.params;

    // Validação do ID do estoque
    const { success, error } = estoqueValidator({
      idEstoque: Number(idEstoque),
    });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar o ID do estoque!",
        errors: error,
      });
    }

    // Busca o estoque pelo ID
    const result = await getById(Number(idEstoque));

    if (!result) {
      return res.status(404).json({
        message: "Estoque não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Estoque encontrado com sucesso.",
      estoque: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao buscar estoque:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
