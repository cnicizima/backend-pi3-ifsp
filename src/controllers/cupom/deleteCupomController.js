import { remove, cupomValidator } from "../../models/cupomModels.js";

export default async function deleteCupomController(req, res) {
  try {
    const { idCupom } = req.params;

    // Validação do ID do cupom
    const { success, error } = cupomValidator({ idCupom: Number(idCupom) });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar o ID do cupom!",
        errors: error,
      });
    }

    // Remoção do cupom
    const result = await remove(Number(idCupom));

    if (!result) {
      return res.status(404).json({
        message: "Cupom não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Cupom removido com sucesso.",
      cupom: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao remover cupom:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
