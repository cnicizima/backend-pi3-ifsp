import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const cupomValidator = z.object({
  codigo: z.string()
    .max(50, { message: "Código deve ter no máximo 50 caracteres." }),
  desconto: z.number()
    .min(0, { message: "O desconto não pode ser negativo." })
    .max(100, { message: "O desconto não pode ser maior que 100%." }),
  pedidos: z.array(z.object({
    idPedido: z.number().optional(),
  })).optional(), // Optional relation field
});

export async function create(cupom) {
  return await prisma.cupom.create({
    data: cupom,
  });
}

export async function update(id, cupom) {
  return await prisma.cupom.update({
    where: { idCupom: id },
    data: cupom,
  });
}

export async function getById(id) {
  return await prisma.cupom.findUnique({
    where: { idCupom: id },
  });
}

export async function list() {
  return await prisma.cupom.findMany();
}

export async function remove(id) {
  return await prisma.cupom.delete({
    where: { idCupom: id },
  });
}