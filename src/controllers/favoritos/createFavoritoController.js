import { create, favoritoValidator } from "../../models/favoritoModels.js";

export default async function createFavoritoController(req, res) {
  try {
    const favorito = req.body;

    // Validação dos dados do favorito
    const { success, error } = favoritoValidator(favorito);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do favorito!",
        errors: error,
      });
    }

    // Criação do favorito
    const result = await create(favorito);

    if (!result) {
      return res.status(500).json({
        message: "Erro ao adicionar favorito",
      });
    }

    return res.status(201).json({
      message: "Favorito adicionado com sucesso",
      favorito: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao adicionar favorito:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
