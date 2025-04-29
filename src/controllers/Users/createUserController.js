import { create, userValidator } from "../../models/userModels.js";

export default async function createUserController(req, res) {
  try {
    const user = req.body;

    // Validação dos dados do usuário
    const validation = userValidator(user);

    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do usuário!",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    // Salvar o usuário no banco usando os dados validados
    const result = await create(validation.data);

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
      error: err.message
    });
  }
}