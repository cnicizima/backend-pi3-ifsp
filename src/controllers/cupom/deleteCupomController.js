import { remove } from "../../models/cupomModels.js";

export default async function deleteCupomController(req, res, next) {
  try {
    const { idCupom } = req.params;

    if (!idCupom || isNaN(+idCupom)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Remoção do cupom
    const result = await remove(+idCupom);

    if (!result) {
      return res.status(404).json({
        message: "Cupom não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Cupom removido com sucesso.",
      cupom: result,
    });
  } catch (error) {
    next(error);
  }
}