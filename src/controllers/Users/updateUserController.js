import { update, userValidator } from "../../models/userModels.js";
import bcrypt from "bcrypt";

export default async function updateUserController(req, res, next) {
  try {
    const { id } = req.params;
    const user = req.body;

    // Validação do ID
    if (!id || isNaN(+id)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Adiciona o ID ao objeto do usuário
    user.id = +id;

    const { success, error } = userValidator(user, {
      name: true,
      email: true,
      password: true,
    });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do usuário!",
        errors: error.flatten().fieldErrors,
      });
    }

    // Se o campo password existir, encripte antes de atualizar
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }

    // Atualiza o usuário
    const result = await update(+id, user);

    if (!result) {
      return res.status(404).json({
        message: "Usuário não encontrado. Não foi possível atualizar.",
      });
    }

    delete result.password;

    return res.status(200).json({
      message: "Usuário atualizado com sucesso.",
      user: result,
    });
  } catch (error) {
    next(error);
  }
}
