import { create, userValidator } from "../../models/userModels.js";

export default async function createUserController(req, res, next) {
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
  } catch (error) {
    if (error?.code === "P2002" && error?.meta?.target === "user_email_key") {
      return res.status(400).json({
        message: "Erro ao criar usuário",
        errors: {
          email: ["email já cadastrado"]
        }
      })
    }
    next(error)
  }
}