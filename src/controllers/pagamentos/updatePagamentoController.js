import { update, pagamentoValidator } from "../../models/pagamentoModels.js";

export default async function updatePagamentoController(req, res, next) {
  try {
    const { idPagamento } = req.params;
    const pagamento = req.body;

    if (!idPagamento || isNaN(+idPagamento)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados do pagamento
    const validation = pagamentoValidator.safeParse(pagamento);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do pagamento!",
        errors: validation.error.format(),
      });
    }

    // Atualização do pagamento
    const result = await update(+idPagamento, validation.data);

    if (!result) {
      return res.status(404).json({
        message: "Pagamento não encontrado ou não atualizado.",
      });
    }

    return res.status(200).json({
      message: "Pagamento atualizado com sucesso.",
      pagamento: result,
    });
  } catch (error) {
    next(error);
  }
}