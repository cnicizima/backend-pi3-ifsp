import { list } from "../../models/produtoModels.js";

export default async function listProdutoController(req, res, next) {
  try {
    // Busca todos os produtos
    const result = await list();

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhum produto encontrado.",
      });
    }

    return res.status(200).json({
      message: "Produtos listados com sucesso.",
      produtos: result,
    });
  }  catch (error) {
    next(error)
  }
}