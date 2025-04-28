import { create, userValidator } from "../../models/userModels.js";

export default async function createUserController(req, res) {
  try {
    const user = req.body;

    // Validação dos dados do usuário
    const { success, error } = userValidator(user);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do usuário!",
        errors: error.flatten().fieldErrors,
      });
    }

    // Salvar o usuário no banco
    const result = await create(user);

    // Remove a senha do retorno
    delete result.password;

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: result,
    });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}