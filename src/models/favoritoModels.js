import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const favoritoValidator = z.object({
  usuarioCpf: z.string().length(11, { message: "CPF deve ter 11 dígitos." }),
  idProduto: z.number().int({ message: "O id do produto deve ser um número inteiro." }),
});

export async function create(favorito) {
  return await prisma.favoritos.create({
    data: favorito,
  });
}

export async function update(id, favorito) {
  return await prisma.favoritos.update({
    where: { idFavorito: id },
    data: favorito,
  });
}

export async function getById(id) {
  return await prisma.favoritos.findUnique({
    where: { idFavorito: id },
  });
}

export async function list() {
  return await prisma.favoritos.findMany();
}

export async function remove(id) {
  return await prisma.favoritos.delete({
    where: { idFavorito: id },
  });
}