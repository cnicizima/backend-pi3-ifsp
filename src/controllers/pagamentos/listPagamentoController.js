import { list } from "../../models/pagamentoModels.js";

export default async function listPagamentoController(req, res) {
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
  } catch (err) {
    console.error("Erro ao listar pagamentos:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}