import { remove } from "../../models/userModels.js";

export default async function deleteUserController(req, res, next) {
  try {
    const { id } = req.params;

    // Verifica se o ID é válido
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Tenta remover o usuário
    const result = await remove(Number(id));

    if (!result) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Usuário removido com sucesso.",
    });
  }  catch (error) {
    next(error)
  }
}