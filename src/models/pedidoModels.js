import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const pedidoValidator = z.object({
  usuarioCpf: z.string()
    .length(11, { message: "CPF deve ter 11 dígitos." }),
  idEndereco: z.number()
    .int({ message: "O id do endereço deve ser um número inteiro." }),
  valorTotal: z.number()
    .min(0, { message: "O valor total não pode ser negativo." }),
  status: z.string()
    .max(100, { message: "Status muito longo." }),
  dataCompra: z.coerce.date().default(() => new Date()), // Coerce to Date
  idCupom: z.number().nullable().optional(),
});

export async function create(pedido) {
  return await prisma.pedido.create({
    data: pedido,
  });
}

export async function update(id, pedido) {
  return await prisma.pedido.update({
    where: { idPedido: id },
    data: pedido,
  });
}

export async function getById(id) {
  return await prisma.pedido.findUnique({
    where: { idPedido: id },
  });
}

export async function getByCpf(cpf) {
  return await prisma.pedido.findMany({
    where: { usuarioCpf: cpf },
    include: {
      endereco: true, // Inclui os dados do endereço relacionado
      pagamento: true, // Inclui os dados do pagamento relacionado
      produtos: {
        include: {
          produto: true, // Inclui os dados dos produtos relacionados
        },
      },
    },
  });
}

export async function list() {
  return await prisma.pedido.findMany();
}

export async function remove(id) {
  return await prisma.pedido.delete({
    where: { idPedido: id },
  });
}