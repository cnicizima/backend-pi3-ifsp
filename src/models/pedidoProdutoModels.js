import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const pedidoProdutoValidator = z.object({
  idPedido: z.number().int({ message: "O id do pedido deve ser um número inteiro." }),
  idProduto: z.number().int({ message: "O id do produto deve ser um número inteiro." }),
  quantidade: z.number().min(1, { message: "A quantidade deve ser maior que zero." }),
  valorItem: z.number().min(0, { message: "O valor não pode ser negativo." }),
});

export async function create(pedidoProduto) {
  return await prisma.pedidoProduto.create({
    data: pedidoProduto,
  });
}

export async function update(id, pedidoProduto) {
  return await prisma.pedidoProduto.update({
    where: { idPedidoProduto: id },
    data: pedidoProduto,
  });
}

export async function getById(id) {
  return await prisma.pedidoProduto.findUnique({
    where: { idPedidoProduto: id },
  });
}

export async function list() {
  return await prisma.pedidoProduto.findMany();
}

export async function remove(id) {
  return await prisma.pedidoProduto.delete({
    where: { idPedidoProduto: id },
  });
}
