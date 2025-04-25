import { update,userValidator } from '../../models/userModels.js';

export default async function updateUserController(req, res) {
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

    const { success, error } = userValidator(user, { name: true, email: true, pass: true });

    if (!success) {
        return res.status(400).json({
            message: "Erro ao validar os dados do usuário!",
            errors: error.flatten().fieldErrors,
        });
    }

    // Atualiza o usuário
    const result = await update(+id, user);

    if (!result) {
        return res.status(404).json({
            message: "Usuário não encontrado. Não foi possível atualizar.",
        });
    }

    return res.status(200).json({

      message: "Usuário atualizado com sucesso.",
      user: result,
  });
} catch (err) {
  // Tratamento de erros inesperados
  console.error("Erro ao atualizar usuário:", err);
  return res.status(500).json({
      message: "Erro interno do servidor.",
  });
}
}
  

      

