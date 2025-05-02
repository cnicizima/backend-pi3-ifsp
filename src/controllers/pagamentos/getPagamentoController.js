import { getById } from "../../models/pagamentoModels.js";

export default async function getPagamentoController(req, res, next) {
  try {
    const { idPagamento } = req.params;

    if (!idPagamento || isNaN(+idPagamento)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Busca o pagamento pelo ID
    const result = await getById(+idPagamento);

    if (!result) {
      return res.status(404).json({
        message: "Pagamento não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Pagamento encontrado com sucesso.",
      pagamento: result,
    });
  } catch (error) {
    next(error);
  }
}