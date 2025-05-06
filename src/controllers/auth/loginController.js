import { getByemail, userValidator } from "../../models/userModels.js";
import bcrypt from "bcrypt";

export default async function loginController(req, res, next) {
  try {
    const user = req.body;

    // Validação dos dados do usuário (somente email e password)
    const validation = userValidator(user, { cpf: true, nome: true, telefone: true, nascimento: true, avatar: true, isAdmin: true, sexo: true });

    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do usuário",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    // Buscar o usuário pelo email
    const result = await getByemail(validation.data.email);

    if (!result) {
      return res.status(400).json({
        message: "Usuário ou senha inválidos (usuário não encontrado)",
      });
    }

    // Comparar a senha
    const passIsValid = bcrypt.compareSync(validation.data.password, result.password);

    if (!passIsValid) {
      return res.status(400).json({
        message: "Usuário ou senha inválidos (senha não confere)",
      });
    }

    // Retornar sucesso
    return res.status(200).json({
      message: "Login realizado com sucesso"
    });
    
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}