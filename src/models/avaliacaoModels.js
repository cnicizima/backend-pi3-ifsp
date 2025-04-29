import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const avaliacaoValidator = z.object({
  usuarioCpf: z.string().length(11, { message: "CPF deve ter 11 dígitos." }),
  idProduto: z.number().int({ message: "O id do produto deve ser um número inteiro." }),
  avaliacao: z.number()
    .min(0, { message: "A avaliação não pode ser negativa." })
    .max(5, { message: "A avaliação não pode ser maior que 5." })
    .nullable()
    .optional(),
  conteudo: z.string().nullable().optional(),
  dataCriacao: z.date().default(() => new Date()),
});

export async function create(avaliacao) {
  return await prisma.avaliacao.create({
    data: avaliacao,
  });
}

export async function update(id, avaliacao) {
  return await prisma.avaliacao.update({
    where: { idAvaliacao: id },
    data: avaliacao,
  });
}

export async function getById(id) {
  return await prisma.avaliacao.findUnique({
    where: { idAvaliacao: id },
  });
}

export async function list() {
  return await prisma.avaliacao.findMany();
}

export async function remove(id) {
  return await prisma.avaliacao.delete({
    where: { idAvaliacao: id },
  });
}