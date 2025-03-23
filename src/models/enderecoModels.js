import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(endereco) {
  const result = await prisma.endereco.create({
    data: endereco,
  });
  return result;
}

export async function list() {
  const result = await prisma.endereco.findMany();
  return result;
}

export async function getById(id) {
  const result = await prisma.endereco.findUnique({
    where: {
      idEndereco: id,
    },
  });
  return result;
}

export async function remove(id) {
  const result = await prisma.endereco.delete({
    where: {
      idEndereco: id,
    },
  });
  return result;
}

export async function update(id, endereco) {
  const result = await prisma.endereco.update({
    where: {
      idEndereco: id,
    },
    data: endereco,
  });
  return result;
}
