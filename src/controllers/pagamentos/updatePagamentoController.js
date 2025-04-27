import { update, pagamentoValidator } from "../../models/pagamentoModels.js";

export default async function updatePagamentoController(req, res) {
  try {
    const { idPagamento } = req.params;
    const pagamento = req.body;

    // Validação do ID do pagamento
    if (!idPagamento || isNaN(+idPagamento)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados do pagamento
    const { success, error } = pagamentoValidator(pagamento);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do pagamento!",
        errors: error,
      });
    }

    // Atualização do pagamento
    const result = await update(Number(idPagamento), pagamento);

    if (!result) {
      return res.status(404).json({
        message: "Pagamento não encontrado ou não atualizado.",
      });
    }

    return res.status(200).json({
      message: "Pagamento atualizado com sucesso.",
      pagamento: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao atualizar pagamento:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
