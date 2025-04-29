import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const prisma = new PrismaClient();

const produtoSchema = z.object({

  fotoVinho: z.string({
      invalid_type_error: "A foto deve ser uma string URL.",
      required_error: "A foto é obrigatória."
  })
  .url({ message: "URL da foto inválida" }),
  
  nome: z.string({
      invalid_type_error: "O nome deve ser uma string.",
      required_error: "O nome é obrigatório."
  })
  .min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
  .max(255, { message: "O nome deve ter no máximo 255 caracteres" }),
  
  descricao: z.string({
      invalid_type_error: "A descrição deve ser uma string.",
      required_error: "A descrição é obrigatória."
  })
  .max(1000, { message: "A descrição deve ter no máximo 1000 caracteres" }),
  
  preco: z.number({
      invalid_type_error: "O preço deve ser um valor numérico.",
      required_error: "O preço é obrigatório."
  })
  .min(0, { message: "O preço não pode ser negativo" }),

  classificacao: z.string({
    invalid_type_error: "A classificação deve ser uma string.",
    required_error: "A classificação é obrigatória."
})
.max(100, { message: "Classificação muito longa" }),

categoria: z.string({
    invalid_type_error: "A categoria deve ser uma string.",
    required_error: "A categoria é obrigatória."
})
.max(100, { message: "Categoria muito longa" }),

gustativo: z.string({
    invalid_type_error: "O gustativo deve ser uma string.",
    required_error: "O gustativo é obrigatório."
})
.max(500, { message: "Descrição gustativa muito longa" }),

olfativo: z.string({
    invalid_type_error: "O olfativo deve ser uma string.",
    required_error: "O olfativo é obrigatório."
})
.max(500, { message: "Descrição olfativa muito longa" }),

regiao: z.string({
    invalid_type_error: "A região deve ser uma string.",
    required_error: "A região é obrigatória."
})
.max(255, { message: "Nome da região muito longo" }),

amadurecimento: z.string({
    invalid_type_error: "O amadurecimento deve ser uma string.",
    required_error: "O amadurecimento é obrigatório."
})
.max(500, { message: "Descrição do amadurecimento muito longa" }),

analises: z.string({
  invalid_type_error: "As análises devem ser uma string.",
  required_error: "As análises são obrigatórias."
})
.max(1000, { message: "Análises muito longas" }),

uvas: z.string({
  invalid_type_error: "As uvas devem ser uma string.",
  required_error: "As uvas são obrigatórias."
})
.max(255, { message: "Lista de uvas muito longa" }),

temperatura: z.string({
  invalid_type_error: "A temperatura deve ser uma string.",
  required_error: "A temperatura é obrigatória."
})
.max(50, { message: "Temperatura muito longa" })
});

export const produtoValidator = (produto, partial = null) => {
  if (partial) {
      return produtoSchema.partial(partial).safeParse(produto);
  }
  return produtoSchema.safeParse(produto);
}

export async function create(produto) {

  const result = await prisma.produto.create({
      data: validated.data
  });
  return result;
}

export async function update(id, produto) {

  const result = await prisma.produto.update({
      where: { idProduto: id },
      data: validated.data
  });
  return result;
}

export async function remove(id) {
  const result = await prisma.produto.delete({
      where: { idProduto: id }
  });
  return result;
}

export async function getById(id) {
  const result = await prisma.produto.findUnique({
      where: { idProduto: id }
  });
  return result;
}

export async function list() {
  const result = await prisma.produto.findMany();
  return result;
}