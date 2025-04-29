import { list } from "../../models/produtoModels.js";

export default async function listProdutoController(req, res) {
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
  } catch (err) {
    console.error("Erro ao listar produtos:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}