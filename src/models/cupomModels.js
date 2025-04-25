import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const cupomSchema = z.object({
    idCupom: z.number({
        invalid_type_error: "O id deve ser um valor numérico.",
        required_error: "O id é obrigatório."
    }).optional(),

    codigo: z.string({
        invalid_type_error: "O código deve ser uma string.",
        required_error: "O código é obrigatório."
    }).max(50, { message: "Código muito longo" }),

    desconto: z.number({
        invalid_type_error: "O desconto deve ser um valor numérico.",
        required_error: "O desconto é obrigatório."
    }).min(0, { message: "O desconto não pode ser negativo" })
    .max(100, { message: "O desconto não pode ser maior que 100%" }),

    pedidos: z.string({
        invalid_type_error: "Os pedidos devem ser uma string.",
        required_error: "Os pedidos são obrigatórios."
    }).max(255, { message: "Lista de pedidos muito longa" }).optional()
});

export const cupomValidator = (cupom, partial = null) => {
  if (partial) {
      return cupomSchema.partial(partial).safeParse(cupom);
  }
  return cupomSchema.safeParse(cupom);
}

export async function create(cupom) {
  const validated = cupomValidator(cupom);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.cupom.create({
      data: validated.data
  });
}

export async function update(id, cupom) {
  const validated = cupomValidator(cupom, true);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.cupom.update({
      where: { idCupom: id },
      data: validated.data
  });
}

export async function getById(id) {
  return await prisma.cupom.findUnique({
      where: { idCupom: id }
  });
}

export async function list() {
  return await prisma.cupom.findMany();
}

export async function remove(id) {
  return await prisma.cupom.delete({
      where: { idCupom: id }
  });
}