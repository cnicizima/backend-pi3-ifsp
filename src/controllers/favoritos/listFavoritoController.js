import { list, favoritoValidator } from "../../models/favoritoModels.js";

export default async function listFavoritoController(req, res) {
  try {
    // Busca todos os favoritos
    const result = await list();

    // Valida se há favoritos
    const { success, error } = favoritoValidator({ favoritos: result });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os favoritos!",
        errors: error.flatten().fieldErrors,
      });
    }

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
    // Captura e trata erros inesperados
    console.error("Erro ao listar favoritos:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
