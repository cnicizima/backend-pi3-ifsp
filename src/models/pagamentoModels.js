import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const pagamentoValidator = z.object({
  idPedido: z.number().int({ message: "O id do pedido deve ser um número inteiro." }),
  metodo: z.string().max(100, { message: "Método muito longo." }),
  status: z.string().max(100, { message: "Status muito longo." }),
  valorPago: z.number().min(0, { message: "O valor não pode ser negativo." }),
  dataPagamento: z.coerce.date().optional(), // Coerce to Date and make optional
});

export async function create(pagamento) {
  return await prisma.pagamento.create({
    data: pagamento,
  });
}

export async function update(id, pagamento) {
  return await prisma.pagamento.update({
    where: { idPagamento: id },
    data: pagamento,
  });
}

export async function getById(id) {
  return await prisma.pagamento.findUnique({
    where: { idPagamento: id },
  });
}

export async function list() {
  return await prisma.pagamento.findMany();
}

export async function remove(id) {
  return await prisma.pagamento.delete({
    where: { idPagamento: id },
  });
}