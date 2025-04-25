import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const prisma = new PrismaClient();

const pedidoSchema = z.object({
    idPedido: z.number({
        invalid_type_error: "O id deve ser um valor numérico.",
        required_error: "O id é obrigatório."
    }).optional(),

    usuarioCpf: z.string({
        invalid_type_error: "O CPF deve ser uma string.",
        required_error: "O CPF é obrigatório."
    }).length(11, { message: "CPF deve ter 11 dígitos" }),

    idEndereco: z.number({
        invalid_type_error: "O id do endereço deve ser um valor numérico.",
        required_error: "O id do endereço é obrigatório."
    }),

    valorTotal: z.number({
        invalid_type_error: "O valor total deve ser um valor numérico.",
        required_error: "O valor total é obrigatório."
    }).min(0, { message: "O valor total não pode ser negativo" }),

    status: z.string({
        invalid_type_error: "O status deve ser uma string.",
        required_error: "O status é obrigatório."
    }).max(100, { message: "Status muito longo" }),

    dataCompra: z.date({
      invalid_type_error: "A data deve ser válida.",
      required_error: "A data é obrigatória."
  }).default(() => new Date()),

  idCupom: z.number({
      invalid_type_error: "O id do cupom deve ser um valor numérico."
  }).optional().nullable()
});

export const pedidoValidator = (pedido, partial = null) => {
  if (partial) {
      return pedidoSchema.partial(partial).safeParse(pedido);
  }
  return pedidoSchema.safeParse(pedido);
}

export async function create(pedido) {
  const validated = pedidoValidator(pedido);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.pedido.create({
      data: validated.data
  });
}

export async function update(id, pedido) {
  const validated = pedidoValidator(pedido, true);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.pedido.update({
      where: { idPedido: id },
      data: validated.data
  });
}

export async function getById(id) {
  return await prisma.pedido.findUnique({
      where: { idPedido: id }
  });
}

export async function list() {
  return await prisma.pedido.findMany();
}

export async function remove(id) {
  return await prisma.pedido.delete({
      where: { idPedido: id }
  });
}