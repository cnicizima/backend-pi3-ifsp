import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const prisma = new PrismaClient();

const pedidoProdutoSchema = z.object({
    idPedidoProduto: z.number({
        invalid_type_error: "O id deve ser um valor numérico.",
        required_error: "O id é obrigatório."
    }).optional(),

    idPedido: z.number({
        invalid_type_error: "O id do pedido deve ser um valor numérico.",
        required_error: "O id do pedido é obrigatório."
    }),

    idProduto: z.number({
        invalid_type_error: "O id do produto deve ser um valor numérico.",
        required_error: "O id do produto é obrigatório."
    }),

    quantidade: z.number({
        invalid_type_error: "A quantidade deve ser um valor numérico.",
        required_error: "A quantidade é obrigatória."
    }).min(1, { message: "A quantidade deve ser maior que zero" }),

    valorItem: z.number({
        invalid_type_error: "O valor do item deve ser um valor numérico.",
        required_error: "O valor do item é obrigatório."
    }).min(0, { message: "O valor não pode ser negativo" })
});

export const pedidoProdutoValidator = (pedidoProduto, partial = null) => {
  if (partial) {
      return pedidoProdutoSchema.partial(partial).safeParse(pedidoProduto);
  }
  return pedidoProdutoSchema.safeParse(pedidoProduto);
}

export async function create(pedidoProduto) {
  const validated = pedidoProdutoValidator(pedidoProduto);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.pedidoProduto.create({
      data: validated.data
  });
}

export async function getById(id) {
  return await prisma.pedidoProduto.findUnique({
    where: {
      idPedidoProduto: id,
    },
  });
}

export async function list() {
  return await prisma.pedidoProduto.findMany();
}

export async function create(pedidoProduto) {
  return await prisma.pedidoProduto.create({
    data: pedidoProduto,
  });
}

export async function update(id, pedidoProduto) {
  return await prisma.pedidoProduto.update({
    where: {
      idPedidoProduto: id,
    },
    data: pedidoProduto,
  });
}

export async function remove(id) {
  return await prisma.pedidoProduto.delete({
    where: {
      idPedidoProduto: id,
    },
  });
}
