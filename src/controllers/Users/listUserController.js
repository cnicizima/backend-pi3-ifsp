import { list } from "../../models/userModels.js";

export default async function listUserController(req, res, next) {
  try {
    // Busca todos os usuários
    const result = await list();

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhum usuário encontrado.",
      });
    }

    return res.status(200).json({
      message: "Usuários listados com sucesso.",
      usuarios: result,
    });
  }  catch (error) {
    next(error)
  }
}
