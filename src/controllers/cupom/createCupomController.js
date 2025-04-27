import { create, cupomValidator } from "../../models/cupomModels.js";

export default async function createCupomController(req, res) {
  try {
    const cupom = req.body;

    // Validação dos dados do cupom
    const { success, error } = cupomValidator(cupom);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do cupom!",
        errors: error,
      });
    }

    // Criação do cupom
    const result = await create(cupom);

    if (!result) {
      return res.status(500).json({
        message: "Erro ao criar cupom",
      });
    }

    return res.status(201).json({
      message: "Cupom criado com sucesso",
      cupom: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao criar cupom:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
