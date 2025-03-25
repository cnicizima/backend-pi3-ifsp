import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getById(id) {
  return await prisma.pedidoProduto.findUnique({
    where: {
      idPedidoProduto: id,
    },
  });
}

export async function list() {
  return await prisma.pedidoProduto.findMany();
}

export async function create(pedidoProduto) {
  return await prisma.pedidoProduto.create({
    data: pedidoProduto,
  });
}

export async function update(id, pedidoProduto) {
  return await prisma.pedidoProduto.update({
    where: {
      idPedidoProduto: id,
    },
    data: pedidoProduto,
  });
}

export async function remove(id) {
  return await prisma.pedidoProduto.delete({
    where: {
      idPedidoProduto: id,
    },
  });
}
