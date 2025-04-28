import { getById, enderecoValidator } from "../../models/enderecoModels.js";

export default async function getEnderecoController(req, res) {
  try {
    const { idEndereco } = req.params;

    // Validação do ID do endereço
    const { success, error } = enderecoValidator({
      idEndereco: Number(idEndereco),
    });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar o ID do endereço!",
        errors: error,
      });
    }

    // Busca o endereço pelo ID
    const result = await getById(Number(idEndereco));

    if (!result) {
      return res.status(404).json({
        message: "Endereço não encontrado",
      });
    }

    return res.status(200).json({
      message: "Endereço encontrado com sucesso",
      endereco: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao buscar endereço:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
