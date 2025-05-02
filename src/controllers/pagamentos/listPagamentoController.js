import { list } from "../../models/pagamentoModels.js";

export default async function listPagamentoController(req, res, next) {
  try {
    // Busca todos os pagamentos
    const result = await list();

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhum pagamento encontrado.",
      });
    }

    return res.status(200).json({
      message: "Pagamentos listados com sucesso.",
      pagamentos: result,
    });
  } catch (error) {
    next(error);
  }
}