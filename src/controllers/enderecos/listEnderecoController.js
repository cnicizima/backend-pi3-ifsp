import { list, enderecoValidator } from "../../models/enderecoModels.js";

export default async function listEnderecoController(req, res, next) {
  try {
    // Busca todos os endereços
    const result = await list();

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhum endereço encontrado.",
      });
    }

    return res.status(200).json({
      message: "Endereços listados com sucesso.",
      enderecos: result,
    });
  } catch (error) {
    next(error);
  }
}