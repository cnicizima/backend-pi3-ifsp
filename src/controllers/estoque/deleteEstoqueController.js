import { remove, estoqueValidator } from "../../models/estoqueModels.js";

export default async function deleteEstoqueController(req, res) {
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

    // Remoção do estoque
    const result = await remove(Number(idEstoque));

    if (!result) {
      return res.status(404).json({
        error: "Estoque não encontrado",
      });
    }

    return res.status(200).json({
      message: "Estoque removido com sucesso",
      estoque: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao remover estoque:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
