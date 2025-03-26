import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function list() {
  const result = await prisma.cupom.findMany();
  return result;
}

export async function getById(id) {
  const result = await prisma.cupom.findUnique({
    where: {
      idCupom: id,
    },
  });
  return result;
}

export async function create(cupom) {
  const result = await prisma.cupom.create({
    data: cupom,
  });
  return result;
}

export async function update(id, cupom) {
  const result = await prisma.cupom.update({
    where: {
      idCupom: id,
    },
    data: cupom,
  });
  return result;
}

export async function remove(id) {
  const result = await prisma.cupom.delete({
    where: {
      idCupom: id,
    },
  });
  return result;
}
