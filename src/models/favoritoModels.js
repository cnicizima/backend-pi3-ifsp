import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function list() {
  const result = await prisma.favoritos.findMany();
  return result;
}

export async function getById(id) {
  const result = await prisma.favoritos.findUnique({
    where: {
      idFavorito: id,
    },
  });
  return result;
}

export async function create(favorito) {
  const result = await prisma.favoritos.create({
    data: favorito,
  });
  return result;
}

export async function update(id, favorito) {
  const result = await prisma.favoritos.update({
    where: {
      idFavorito: id,
    },
    data: favorito,
  });
  return result;
}

export async function remove(id) {
  const result = await prisma.favoritos.delete({
    where: {
      idFavorito: id,
    },
  });
  return result;
}
