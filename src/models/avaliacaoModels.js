import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function list() {
  const result = await prisma.avaliacao.findMany();
  return result;
}

export async function getById(id) {
  const result = await prisma.avaliacao.findUnique({
    where: {
      idAvaliacao: id,
    },
  });
  return result;
}

export async function create(avaliacao) {
  const result = await prisma.avaliacao.create({
    data: avaliacao,
  });
  return result;
}

export async function update(id, avaliacao) {
  const result = await prisma.avaliacao.update({
    where: {
      idAvaliacao: id,
    },
    data: avaliacao,
  });
  return result;
}

export async function remove(id) {
  const result = await prisma.avaliacao.delete({
    where: {
      idAvaliacao: id,
    },
  });
  return result;
}
