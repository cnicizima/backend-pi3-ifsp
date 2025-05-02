import { getById } from "../../models/enderecoModels.js";
import { z } from "zod";

export default async function getEnderecoController(req, res, next) {
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

    // Busca o endereço pelo ID
    const result = await getById(parsedId.data);

    if (!result) {
      return res.status(404).json({
        message: "Endereço não encontrado",
      });
    }

    return res.status(200).json({
      message: "Endereço encontrado com sucesso",
      endereco: result,
    });
  } catch (error) {
    next(error);
  }
}