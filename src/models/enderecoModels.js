import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const enderecoSchema = z.object({
    idEndereco: z.number({
        invalid_type_error: "O id deve ser um valor numérico.",
        required_error: "O id é obrigatório."
    }).optional(),

    usuarioCpf: z.string({
        invalid_type_error: "O CPF deve ser uma string.",
        required_error: "O CPF é obrigatório."
    }).length(11, { message: "CPF deve ter 11 dígitos" }),

    apelido: z.string({
        invalid_type_error: "O apelido deve ser uma string.",
        required_error: "O apelido é obrigatório."
    }).max(100, { message: "Apelido muito longo" }),

    cep: z.string({
        invalid_type_error: "O CEP deve ser uma string.",
        required_error: "O CEP é obrigatório."
    }).length(8, { message: "CEP deve ter 8 dígitos" }),

    rua: z.string({
        invalid_type_error: "A rua deve ser uma string.",
        required_error: "A rua é obrigatória."
    }).max(255, { message: "Nome da rua muito longo" }),

    numero: z.string({
      invalid_type_error: "O número deve ser uma string.",
      required_error: "O número é obrigatório."
  }).max(10, { message: "Número muito longo" }),

  complemento: z.string({
      invalid_type_error: "O complemento deve ser uma string."
  }).max(255, { message: "Complemento muito longo" }).nullable().optional(),

  cidade: z.string({
      invalid_type_error: "A cidade deve ser uma string.",
      required_error: "A cidade é obrigatória."
  }).max(255, { message: "Nome da cidade muito longo" }),

  estado: z.string({
      invalid_type_error: "O estado deve ser uma string.",
      required_error: "O estado é obrigatório."
  }).length(2, { message: "Estado deve ter 2 caracteres" })
});

export const enderecoValidator = (endereco, partial = null) => {
  if (partial) {
      return enderecoSchema.partial(partial).safeParse(endereco);
  }
  return enderecoSchema.safeParse(endereco);
}

export async function create(endereco) {
  const validated = enderecoValidator(endereco);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.endereco.create({
      data: validated.data
  });
}

export async function update(id, endereco) {
  const validated = enderecoValidator(endereco, true);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.endereco.update({
      where: { idEndereco: id },
      data: validated.data
  });
}

export async function getById(id) {
  return await prisma.endereco.findUnique({
      where: { idEndereco: id }
  });
}

export async function list() {
  return await prisma.endereco.findMany();
}

export async function remove(id) {
  return await prisma.endereco.delete({
      where: { idEndereco: id }
  });
}