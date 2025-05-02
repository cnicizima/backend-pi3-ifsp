import { create, mensagemValidator } from "../../models/mensagemModels.js";

export default async function createMensagemController(req, res, next) {
  try {
    const mensagem = req.body;

    // Validação dos dados da mensagem
    const validation = mensagemValidator.safeParse(mensagem);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados da mensagem!",
        errors: validation.error.format(),
      });
    }

    // Criação da mensagem
    const result = await create(validation.data);

    return res.status(201).json({
      message: "Mensagem criada com sucesso",
      mensagem: result,
    });
  } catch (error) {
    next(error);
  }
}