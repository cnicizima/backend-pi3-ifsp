import { update, estoqueValidator } from "../../models/estoqueModels.js";

export default async function updateEstoqueController(req, res) {
  try {
    const { idEstoque } = req.params;
    const estoque = req.body;

    // Validação do ID do estoque
    if (!idEstoque || isNaN(+idEstoque)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados do estoque
    const { success, error } = estoqueValidator(estoque);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do estoque!",
        errors: error,
      });
    }

    // Atualização do estoque
    const result = await update(Number(idEstoque), estoque);

    if (!result) {
      return res.status(404).json({
        message: "Estoque não encontrado ou não atualizado.",
      });
    }

    return res.status(200).json({
      message: "Estoque atualizado com sucesso.",
      estoque: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao atualizar estoque:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
