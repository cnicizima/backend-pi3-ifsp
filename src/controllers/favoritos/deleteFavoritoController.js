import { remove } from "../../models/favoritoModels.js";

export default async function deleteFavoritoController(req, res, next) {
  try {
    const { idFavorito } = req.params;

    if (!idFavorito || isNaN(+idFavorito)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Remoção do favorito
    const result = await remove(Number(idFavorito));

    if (!result) {
      return res.status(404).json({
        message: "Favorito não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Favorito removido com sucesso.",
      favorito: result,
    });
  } catch (error) {
    next(error);
  }
}