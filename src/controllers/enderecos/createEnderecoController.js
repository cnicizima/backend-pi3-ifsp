import { create } from "../../models/enderecoModels.js";
import { enderecoValidator } from "../../models/enderecoModels.js";

export default async function createEnderecoController(req, res, next) {
  try {
    const endereco = req.body;

    const validation = enderecoValidator.safeParse(endereco);
    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do endereço!",
        errors: validation.error.errors,
      });
    }

    const result = await create(validation.data);

    return res.status(201).json({
      message: "Endereço criado com sucesso",
      endereco: result,
    });
  } catch (error) {
    next(error);
  }
}
