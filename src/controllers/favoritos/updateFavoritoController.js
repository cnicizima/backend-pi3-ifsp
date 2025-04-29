import { update, favoritoValidator } from "../../models/favoritoModels.js";

export default async function updateFavoritoController(req, res) {
  try {
    const { idFavorito } = req.params;
    const favorito = req.body;

    if (!idFavorito || isNaN(+idFavorito)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados do favorito
    const validation = favoritoValidator.safeParse(favorito);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do favorito!",
        errors: validation.error.format(),
      });
    }

    // Atualização do favorito
    const result = await update(Number(idFavorito), validation.data);

    if (!result) {
      return res.status(404).json({
        message: "Favorito não encontrado ou não atualizado.",
      });
    }

    return res.status(200).json({
      message: "Favorito atualizado com sucesso.",
      favorito: result,
    });
  } catch (err) {
    console.error("Erro ao atualizar favorito:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}