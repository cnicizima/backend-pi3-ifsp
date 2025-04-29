import { update } from "../../models/enderecoModels.js";
import { enderecoValidator } from "../../models/enderecoModels.js";

export default async function updateEnderecoController(req, res) {
  try {
    const { idEndereco } = req.params;
    const endereco = req.body;

    if (!idEndereco || isNaN(+idEndereco)) {
      return res.status(400).json({
        message: "ID inválido. Certifique-se de que o ID é um número válido.",
      });
    }

    const validation = enderecoValidator.partial().safeParse(endereco);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do endereço!",
        errors: validation.error.errors,
      });
    }

    const result = await update(+idEndereco, validation.data);

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
    console.error("Erro ao atualizar endereço:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
