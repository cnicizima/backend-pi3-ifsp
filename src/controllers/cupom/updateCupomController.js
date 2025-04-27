import { update, cupomValidator } from "../../models/cupomModels.js";

export default async function updateCupomController(req, res) {
  try {
    const { idCupom } = req.params;
    const cupom = req.body;

    // Validação do ID do cupom
    if (!idCupom || isNaN(+idCupom)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados do cupom
    const { success, error } = cupomValidator(cupom);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do cupom!",
        errors: error.flatten().fieldErrors,
      });
    }

    // Atualização do cupom
    const result = await update(+idCupom, cupom);

    if (!result) {
      return res.status(404).json({
        message: "Cupom não encontrado.",
      });
    }
    return res.status(200).json({
      message: "Cupom atualizado com sucesso.",
      cupom: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao atualizar cupom:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
