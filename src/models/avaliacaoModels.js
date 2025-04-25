import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const avaliacaoSchema = z.object({
    idAvaliacao: z.number({
        invalid_type_error: "O id deve ser um valor numérico.",
        required_error: "O id é obrigatório."
    }).optional(),

    usuarioCpf: z.string({
        invalid_type_error: "O CPF deve ser uma string.",
        required_error: "O CPF é obrigatório."
    }).length(11, { message: "CPF deve ter 11 dígitos" }),

    idProduto: z.number({
        invalid_type_error: "O id do produto deve ser um valor numérico.",
        required_error: "O id do produto é obrigatório."
    }),

    avaliacao: z.number({
        invalid_type_error: "A avaliação deve ser um valor numérico.",
    }).min(0, { message: "A avaliação não pode ser negativa" })
    .max(5, { message: "A avaliação não pode ser maior que 5" })
    .nullable()
    .optional(),

    conteudo: z.string({
        invalid_type_error: "O conteúdo deve ser uma string."
    }).nullable().optional(),

    dataCriacao: z.date({
        invalid_type_error: "A data deve ser válida.",
        required_error: "A data é obrigatória."
    }).default(() => new Date())
});

export const avaliacaoValidator = (avaliacao, partial = null) => {
  if (partial) {
      return avaliacaoSchema.partial(partial).safeParse(avaliacao);
  }
  return avaliacaoSchema.safeParse(avaliacao);
}

export async function create(avaliacao) {
  const validated = avaliacaoValidator(avaliacao);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.avaliacao.create({
      data: validated.data
  });
}

export async function update(id, avaliacao) {
  const validated = avaliacaoValidator(avaliacao, true);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.avaliacao.update({
      where: { idAvaliacao: id },
      data: validated.data
  });
}

export async function getById(id) {
  return await prisma.avaliacao.findUnique({
      where: { idAvaliacao: id }
  });
}

export async function list() {
  return await prisma.avaliacao.findMany();
}

export async function remove(id) {
  return await prisma.avaliacao.delete({
      where: { idAvaliacao: id }
  });
}