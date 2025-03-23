import { getById } from "../../models/enderecoModels.js";

export default async function getEnderecoController(req, res) {
  const { idEndereco } = req.params;
  const result = await getById(+idEndereco);

  if (!result) {
    return res.status(404).json({
      message: "Endereço não encontrado",
    });
  }
  return res.status(200).json({
    endereco: result
  });
}
