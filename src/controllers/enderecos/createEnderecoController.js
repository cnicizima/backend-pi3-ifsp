import { create, enderecoValidator } from "../../models/enderecoModels.js";

export default async function createEnderecoController(req, res) {
  try {
    const endereco = req.body;

    // Validação dos dados do endereço
    const { success, error } = enderecoValidator(endereco);

    if (!success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do endereço!",
        errors: error,
      });
    }

    // Criação do endereço
    const result = await create(endereco);

    if (!result) {
      return res.status(500).json({
        message: "Erro ao criar endereço",
      });
    }

    return res.status(201).json({
      message: "Endereço criado com sucesso",
      endereco: result,
    });
  } catch (err) {
    // Captura e trata erros inesperados
    console.error("Erro ao criar endereço:", err);
    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}

// O usuarioCPF deve ser o mesmo ja cadastrado no banco para ser passado aqui. para ele associar o endereço ao cpf do usuario
