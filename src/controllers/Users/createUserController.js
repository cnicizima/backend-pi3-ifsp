import { create, userValidator } from "../../models/userModels.js";

export default async function createUserController(req, res) {
  try {
    const user = req.body;

    const { success, error } = userValidator(user, { id: true });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do usuário!",
        errors: error.flatten().fieldErrors,
      });
    }

    const result = await create(user);

    if (!result) {
      return res.status(500).json({
        message: "Erro ao criar usuário",
      });
    }

    delete result.pass; // Para não enviar a senha no JSON de retorno

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao criar usuário:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
