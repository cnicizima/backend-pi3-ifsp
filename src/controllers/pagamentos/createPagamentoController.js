import { create, pagamentoValidator } from "../../models/pagamentoModels.js";

export default async function createPagamentoController(req, res) {
  try {
    const pagamento = req.body;

    // Validação dos dados do pagamento
    const { success, error } = pagamentoValidator(pagamento);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do pagamento!",
        errors: error,
      });
    }

    // Criação do pagamento
    const result = await create(pagamento);

    if (!result) {
      return res.status(500).json({
        message: "Erro ao criar pagamento",
      });
    }

    return res.status(201).json({
      message: "Pagamento criado com sucesso",
      pagamento: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao criar pagamento:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
