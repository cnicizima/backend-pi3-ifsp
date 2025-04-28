import { remove, favoritoValidator } from "../../models/favoritoModels.js";

export default async function deleteFavoritoController(req, res) {
  try {
    const { idFavorito } = req.params;

    // Validação do ID do favorito
    const { success, error } = favoritoValidator({
      idFavorito: Number(idFavorito),
    });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar o ID do favorito!",
        errors: error,
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
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao remover favorito:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
