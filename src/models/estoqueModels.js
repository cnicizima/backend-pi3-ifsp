import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const estoqueValidator = z.object({
  idProduto: z.number().int({ message: "O id do produto deve ser um número inteiro." }),
  quantidade: z.number().min(0, { message: "A quantidade não pode ser negativa." }),
});

export async function create(estoque) {
  return await prisma.estoque.create({
    data: estoque,
  });
}

export async function update(id, estoque) {
  return await prisma.estoque.update({
    where: { idEstoque: id },
    data: estoque,
  });
}

export async function getById(id) {
  return await prisma.estoque.findUnique({
    where: { idEstoque: id },
  });
}

export async function list() {
  return await prisma.estoque.findMany();
}

export async function remove(id) {
  return await prisma.estoque.delete({
    where: { idEstoque: id },
  });
}