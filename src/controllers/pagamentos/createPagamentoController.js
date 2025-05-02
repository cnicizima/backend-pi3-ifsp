import { create, pagamentoValidator } from "../../models/pagamentoModels.js";

export default async function createPagamentoController(req, res, next) {
  try {
    const pagamento = req.body;

    // Validação dos dados do pagamento
    const validation = pagamentoValidator.safeParse(pagamento);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do pagamento!",
        errors: validation.error.format(),
      });
    }

    // Criação do pagamento
    const result = await create(validation.data);

    return res.status(201).json({
      message: "Pagamento criado com sucesso",
      pagamento: result,
    });
  } catch (error) {
    next(error);
  }
}