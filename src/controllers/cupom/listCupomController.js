import { list, cupomValidator } from "../../models/cupomModels.js";

export default async function listCupomController(req, res) {
  try {
    // Busca todos os cupons
    const result = await list();

    // Valida se há cupons
    const { success, error } = cupomValidator({ cupons: result });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os cupons!",
        errors: error.flatten().fieldErrors,
      });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhum cupom encontrado.",
      });
    }

    return res.status(200).json({
      message: "Cupons listados com sucesso",
      cupons: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao listar cupons:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
