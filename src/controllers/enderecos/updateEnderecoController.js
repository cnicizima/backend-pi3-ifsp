import { update, enderecoValidator } from "../../models/enderecoModels.js";

export default async function updateEnderecoController(req, res) {
  try {
    const { idEndereco } = req.params;
    const endereco = req.body;

    // Validação do ID do endereço
    if (!idEndereco || isNaN(+idEndereco)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    // Validação dos dados do endereço
    const { success, error } = enderecoValidator(endereco);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do endereço!",
        errors: error,
      });
    }

    // Atualização do endereço
    const result = await update(+idEndereco, endereco);

    if (!result) {
      return res.status(404).json({
        message: "Endereço não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Endereço atualizado com sucesso.",
      endereco: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao atualizar endereço:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
