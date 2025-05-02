import { list } from "../../models/estoqueModels.js";

export default async function listEstoqueController(req, res, next) {
  try {
    // Busca todos os itens do estoque
    const result = await list();

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhum item encontrado no estoque.",
      });
    }

    return res.status(200).json({
      message: "Itens do estoque listados com sucesso.",
      estoques: result,
    });
  } catch (error) {
    next(error);
  }
}