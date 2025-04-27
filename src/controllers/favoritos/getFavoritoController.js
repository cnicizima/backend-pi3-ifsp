import { getById, favoritoValidator } from "../../models/favoritoModels.js";

export default async function getFavoritoController(req, res) {
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

    // Busca o favorito pelo ID
    const result = await getById(Number(idFavorito));

    if (!result) {
      return res.status(404).json({
        message: "Favorito não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Favorito encontrado com sucesso.",
      favorito: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao buscar favorito:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
