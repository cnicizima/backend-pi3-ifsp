import { list, pagamentoValidator } from "../../models/pagamentoModels.js";

export default async function listPagamentoController(req, res) {
  try {
    // Busca todos os pagamentos
    const result = await list();

    // Valida se há pagamentos
    const { success, error } = pagamentoValidator({ pagamentos: result });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os pagamentos!",
        errors: error.flatten().fieldErrors,
      });
    }

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
    // Captura e trata erros inesperados
    console.error("Erro ao listar pagamentos:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
