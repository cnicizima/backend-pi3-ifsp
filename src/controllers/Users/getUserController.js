import { getById, userValidator } from "../../models/userModels.js";

export default async function getUserController(req, res, next) {
  try {
    const { id } = req.params;

    // Validação do ID
    if (!id || isNaN(+id)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Busca o usuário pelo ID
    const result = await getById(+id);

    if (!result) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    const { success, error } = userValidator(result, {
      name: true,
      email: true,
      pass: true,
    });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do usuário!",
        errors: error.flatten().fieldErrors,
      });
    }

    return res.status(200).json({
      message: "Usuário encontrado com sucesso.",
      user: result,
    });
  }  catch (error) {
    next(error)
  }
}
