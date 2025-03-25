import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getById(id) {
  return await prisma.pagamento.findUnique({
    where: {
      idPagamento: id,
    },
  });
}

export async function list() {
  return await prisma.pagamento.findMany();
}

export async function create(pagamento) {
  return await prisma.pagamento.create({
    data: pagamento,
  });
}

export async function update(id, pagamento) {
  return await prisma.pagamento.update({
    where: {
      idPagamento: id,
    },
    data: pagamento,
  });
}

export async function remove(id) {
  return await prisma.pagamento.delete({
    where: {
      idPagamento: id,
    },
  });
}
