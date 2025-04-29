import { getById } from "../../models/mensagemModels.js";

export default async function getMensagemController(req, res) {
  try {
    const { idMensagem } = req.params;

    if (!idMensagem || isNaN(+idMensagem)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Busca a mensagem pelo ID
    const result = await getById(Number(idMensagem));

    if (!result) {
      return res.status(404).json({
        message: "Mensagem não encontrada.",
      });
    }

    return res.status(200).json({
      message: "Mensagem encontrada com sucesso.",
      mensagem: result,
    });
  } catch (err) {
    console.error("Erro ao buscar mensagem:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}