import { getById } from "../../models/favoritoModels.js";

export default async function getFavoritoController(req, res) {
  try {
    const { idFavorito } = req.params;

    if (!idFavorito || isNaN(+idFavorito)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
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
    console.error("Erro ao buscar favorito:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}