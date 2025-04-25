import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const prisma = new PrismaClient();

const pagamentoSchema = z.object({
    idPagamento: z.number({
        invalid_type_error: "O id deve ser um valor numérico.",
        required_error: "O id é obrigatório."
    }).optional(),

    idPedido: z.number({
        invalid_type_error: "O id do pedido deve ser um valor numérico.",
        required_error: "O id do pedido é obrigatório."
    }),

    metodo: z.string({
        invalid_type_error: "O método deve ser uma string.",
        required_error: "O método é obrigatório."
    }).max(100, { message: "Método muito longo" }),

    status: z.string({
        invalid_type_error: "O status deve ser uma string.",
        required_error: "O status é obrigatório."
    }).max(100, { message: "Status muito longo" }),

    valorPago: z.number({
        invalid_type_error: "O valor deve ser um valor numérico.",
        required_error: "O valor é obrigatório."
    }).min(0, { message: "O valor não pode ser negativo" }),

    dataPagamento: z.date({
        invalid_type_error: "A data deve ser válida.",
        required_error: "A data é obrigatória."
    }).default(() => new Date())
});

export const pagamentoValidator = (pagamento, partial = null) => {
  if (partial) {
      return pagamentoSchema.partial(partial).safeParse(pagamento);
  }
  return pagamentoSchema.safeParse(pagamento);
}

export async function create(pagamento) {
  const validated = pagamentoValidator(pagamento);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.pagamento.create({
      data: validated.data
  });
}

export async function update(id, pagamento) {
  const validated = pagamentoValidator(pagamento, true);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.pagamento.update({
      where: { idPagamento: id },
      data: validated.data
  });
}

export async function getById(id) {
  return await prisma.pagamento.findUnique({
      where: { idPagamento: id }
  });
}

export async function list() {
  return await prisma.pagamento.findMany();
}

export async function remove(id) {
  return await prisma.pagamento.delete({
      where: { idPagamento: id }
  });
}
