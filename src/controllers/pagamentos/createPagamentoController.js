import { create, pagamentoValidator } from "../../models/pagamentoModels.js";

export default async function createPagamentoController(req, res) {
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
  } catch (err) {
    console.error("Erro ao criar pagamento:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}