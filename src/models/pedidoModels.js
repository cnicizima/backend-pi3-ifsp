import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getById(id) {
  return await prisma.pedido.findUnique({
    where: {
      idPedido: id,
    },
  });
}

export async function list() {
  return await prisma.pedido.findMany();
}

export async function create(pedido) {
  return await prisma.pedido.create({
    data: pedido,
  });
}

export async function update(id, pedido) {
  return await prisma.pedido.update({
    where: { 
        idPedido:id
    },
    data: pedido,
  });
}

export async function remove(id) {
  return await prisma.pedido.delete({
    where: {
        idPedido: id
    },
  });
}
