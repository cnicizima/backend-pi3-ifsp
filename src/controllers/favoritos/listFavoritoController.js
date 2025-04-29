import { list } from "../../models/favoritoModels.js";

export default async function listFavoritoController(req, res) {
  try {
    // Busca todos os favoritos
    const result = await list();

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhum favorito encontrado.",
      });
    }

    return res.status(200).json({
      message: "Favoritos listados com sucesso.",
      favoritos: result,
    });
  } catch (err) {
    console.error("Erro ao listar favoritos:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}