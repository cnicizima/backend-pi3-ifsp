import { create, avaliacaoValidator } from "../../models/avaliacaoModels.js";

export default async function createAvaliacaoController(req, res, next) {
  try {
    const avaliacao = req.body;

    // Validação dos dados da avaliação
    const validation = avaliacaoValidator.safeParse(avaliacao);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados da avaliação!",
        errors: validation.error.format(),
      });
    }

    // Criação da avaliação
    const result = await create(validation.data);

    return res.status(201).json({
      message: "Avaliação criada com sucesso",
      avaliacao: result,
    });
  } catch (error) {
    next(error);
  }
}