import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const favoritoSchema = z.object({
    idFavorito: z.number({
        invalid_type_error: "O id deve ser um valor numérico.",
        required_error: "O id é obrigatório."
    }).optional(),

    usuarioCpf: z.string({
        invalid_type_error: "O CPF deve ser uma string.",
        required_error: "O CPF é obrigatório."
    }).length(11, { message: "CPF deve ter 11 dígitos" }),

    idProduto: z.number({
        invalid_type_error: "O id do produto deve ser um valor numérico.",
        required_error: "O id do produto é obrigatório."
    })
});

export const favoritoValidator = (favorito, partial = null) => {
  if (partial) {
      return favoritoSchema.partial(partial).safeParse(favorito);
  }
  return favoritoSchema.safeParse(favorito);
}

export async function create(favorito) {
  const validated = favoritoValidator(favorito);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.favoritos.create({
      data: validated.data
  });
}

export async function update(id, favorito) {
  const validated = favoritoValidator(favorito, true);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.favoritos.update({
      where: { idFavorito: id },
      data: validated.data
  });
}

export async function getById(id) {
  return await prisma.favoritos.findUnique({
      where: { idFavorito: id }
  });
}

export async function list() {
  return await prisma.favoritos.findMany();
}

export async function remove(id) {
  return await prisma.favoritos.delete({
      where: { idFavorito: id }
  });
}