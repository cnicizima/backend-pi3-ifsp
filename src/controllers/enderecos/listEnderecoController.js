import { list, enderecoValidator } from "../../models/enderecoModels.js";

export default async function listEnderecoController(req, res) {
  try {
    // Busca todos os endereços
    const result = await list();

    // Valida se há endereços
    const { success, error } = enderecoValidator({ enderecos: result });

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os endereços!",
        errors: error.flatten().fieldErrors,
      });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "Nenhum endereço encontrado.",
      });
    }

    return res.status(200).json({
      message: "Endereços listados com sucesso.",
      enderecos: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao listar endereços:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}
