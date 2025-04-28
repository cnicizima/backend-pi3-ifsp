import { remove, pagamentoValidator } from "../../models/pagamentoModels.js";

export default async function deletePagamentoController(req, res) {
  try {
    const { idPagamento } = req.params;

    // Validação do ID do pagamento
    const { success, error } = pagamentoValidator({
      idPagamento: Number(idPagamento),
    });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar o ID do pagamento!",
        errors: error,
      });
    }

    // Remoção do pagamento
    const result = await remove(Number(idPagamento));

    if (!result) {
      return res.status(404).json({
        message: "Pagamento não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Pagamento removido com sucesso.",
      pagamento: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao deletar pagamento:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
