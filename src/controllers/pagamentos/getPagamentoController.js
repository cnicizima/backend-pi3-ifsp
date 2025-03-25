import { getById } from "../../models/pagamentoModels.js";

export default async function getPagamentoController(req, res) {
  const { idPagamento } = req.params;

  const result = await getById(Number(idPagamento));

  if (!result) {
    return res.status(404).json({
      error: "Pagamento não encontrado",
    });
  }

  return res.status(200).json({
  pagamento: result
  })
}
