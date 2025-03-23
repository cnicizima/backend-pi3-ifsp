import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function list() {
  const result = await prisma.produto.findMany();
  return result;
}

export async function create(produto) {
  const result = await prisma.produto.create({
    data: produto,
  });
  return result;
}

export async function remove(id) {
  const result = await prisma.produto.delete({
    where: {
      idProduto: id,
    },
  });
  return result;
}

export async function getById(id) {
  const result = await prisma.produto.findUnique({
    where: {
      idProduto: id,
    },
  });
  return result;
}

export async function update(id, produto) {
  const result = await prisma.produto.update({
    where: {
      idProduto: id,
    },
    data: produto,
  });
  return result;
}
