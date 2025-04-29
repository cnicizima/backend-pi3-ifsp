import { create, favoritoValidator } from "../../models/favoritoModels.js";

export default async function createFavoritoController(req, res) {
  try {
    const favorito = req.body;

    // Validação dos dados do favorito
    const validation = favoritoValidator.safeParse(favorito);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do favorito!",
        errors: validation.error.format(),
      });
    }

    // Criação do favorito
    const result = await create(validation.data);

    return res.status(201).json({
      message: "Favorito adicionado com sucesso",
      favorito: result,
    });
  } catch (err) {
    console.error("Erro ao adicionar favorito:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}