import { remove } from "../../models/enderecoModels.js";
import { z } from "zod";

export default async function deleteEnderecoController(req, res) {
  try {
    const { idEndereco } = req.params;

    // Validação do ID do endereço
    const idValidator = z.number().positive({ message: "ID deve ser um número positivo" });
    const parsedId = idValidator.safeParse(Number(idEndereco));

    if (!parsedId.success) {
      return res.status(400).json({
        message: "Erro ao validar o ID do endereço!",
        errors: parsedId.error.errors,
      });
    }

    // Remoção do endereço
    const result = await remove(parsedId.data);

    if (!result) {
      return res.status(404).json({
        message: "Endereço não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Endereço removido com sucesso.",
      endereco: result,
    });
  } catch (err) {
    console.error("Erro ao remover endereço:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}