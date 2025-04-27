import { list, userValidator } from "../../models/userModels.js";

export default async function listUserController(req, res) {
  try {
    // Busca todos os usuários
    const result = await list();

    // Valida se há usuários
    const { success, error } = userValidator({ usuarios: result });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os usuários!",
        errors: error.flatten().fieldErrors,
      });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhum usuário encontrado.",
      });
    }

    return res.status(200).json({
      message: "Usuários listados com sucesso.",
      usuarios: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao listar usuários:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
