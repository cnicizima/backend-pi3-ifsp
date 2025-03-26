import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function list() {
  const result = await prisma.mensagem.findMany();
  return result;
}

export async function getById(id) {
  const result = await prisma.mensagem.findUnique({
    where: {
      idMensagem: id,
    },
  });
  return result;
}

export async function create(mensagem) {
  const result = await prisma.mensagem.create({
    data: mensagem,
  });
  return result;
}

export async function update(id, mensagem) {
  const result = await prisma.mensagem.update({
    where: {
      idMensagem: id,
    },
    data: mensagem,
  });
  return result;
}

export async function remove(id) {
  const result = await prisma.mensagem.delete({
    where: {
      idMensagem: id,
    },
  });
  return result;
}
