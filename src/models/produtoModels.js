import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const prisma = new PrismaClient();

const produtoSchema = z.object({
  fotoVinho: z.string().url({ message: "URL da foto inválida" }).optional(),
  nome: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }).max(255, { message: "O nome deve ter no máximo 255 caracteres" }),
  descricao: z.string().max(1000, { message: "A descrição deve ter no máximo 1000 caracteres" }),
  preco: z.number().min(0, { message: "O preço não pode ser negativo" }),
  classificacao: z.number().min(0).max(5, { message: "A classificação deve estar entre 0 e 5" }), 
  categoria: z.string().max(50, { message: "Categoria muito longa" }),
  gustativo: z.string().max(500, { message: "Descrição gustativa muito longa" }).optional(),
  olfativo: z.string().max(500, { message: "Descrição olfativa muito longa" }).optional(),
  regiao: z.string().max(150, { message: "Nome da região muito longo" }).optional(),
  amadurecimento: z.string().max(500, { message: "Descrição do amadurecimento muito longa" }).optional(),
  analises: z.string().max(1000, { message: "Análises muito longas" }).optional(),
  uvas: z.string().max(255, { message: "Lista de uvas muito longa" }).optional(),
  temperatura: z.string().max(50, { message: "Temperatura muito longa" }).optional(),
});

export const produtoValidator = (produto, partial = null) => {
  if (partial) {
      return produtoSchema.partial(partial).safeParse(produto);
  }
  return produtoSchema.safeParse(produto);
}

export async function create(produto) {
  const result = await prisma.produto.create({
    data: produto, 
  });
  return result;
}

export async function update(id, produto) {

  const result = await prisma.produto.update({
    where: { idProduto: id },
    data: produto, 
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