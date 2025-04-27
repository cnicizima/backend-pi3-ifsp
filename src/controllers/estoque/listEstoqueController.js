import { list, estoqueValidator } from "../../models/estoqueModels.js";

export default async function listEstoqueController(req, res) {
  try {
    // Busca todos os itens do estoque
    const result = await list();

    // Valida se há itens no estoque
    const { success, error } = estoqueValidator({ estoques: result });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os itens do estoque!",
        errors: error.flatten().fieldErrors,
      });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhum item encontrado no estoque.",
      });
    }

    return res.status(200).json({
      message: "Itens do estoque listados com sucesso.",
      estoques: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao listar itens do estoque:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
