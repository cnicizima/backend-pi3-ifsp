import { update, cupomValidator } from "../../models/cupomModels.js";

export default async function updateCupomController(req, res, next) {
  try {
    const { idCupom } = req.params;
    const cupom = req.body;

    if (!idCupom || isNaN(+idCupom)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados do cupom
    const validation = cupomValidator.safeParse(cupom);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do cupom!",
        errors: validation.error.format(),
      });
    }

    // Atualização do cupom
    const result = await update(+idCupom, validation.data);

    if (!result) {
      return res.status(404).json({
        message: "Cupom não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Cupom atualizado com sucesso.",
      cupom: result,
    });
  } catch (error) {
    next(error);
  }
}