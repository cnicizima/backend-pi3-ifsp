import { list } from "../../models/favoritoModels.js";

export default async function listFavoritoController(req, res, next) {
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
  } catch (error) {
    next(error);
  }
}