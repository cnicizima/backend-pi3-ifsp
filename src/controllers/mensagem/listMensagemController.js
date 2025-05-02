import { list } from "../../models/mensagemModels.js";

export default async function listMensagemController(req, res, next) {
  try {
    // Busca todas as mensagens
    const result = await list();

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhuma mensagem encontrada.",
      });
    }

    return res.status(200).json({
      message: "Mensagens listadas com sucesso.",
      mensagens: result,
    });
  } catch (error) {
    next(error);
  }
}