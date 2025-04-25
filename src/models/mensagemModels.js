import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const prisma = new PrismaClient();

const mensagemSchema = z.object({
    idMensagem: z.number({
        invalid_type_error: "O id deve ser um valor numérico.",
        required_error: "O id é obrigatório."
    }).optional(),

    usuarioCpf: z.string({
        invalid_type_error: "O CPF deve ser uma string.",
        required_error: "O CPF é obrigatório."
    }).length(11, { message: "CPF deve ter 11 dígitos" }),

    assunto: z.string({
        invalid_type_error: "O assunto deve ser uma string.",
        required_error: "O assunto é obrigatório."
    }).max(255, { message: "Assunto muito longo" }),

    conteudo: z.string({
        invalid_type_error: "O conteúdo deve ser uma string.",
        required_error: "O conteúdo é obrigatório."
    }),

    dataEnvio: z.date({
        invalid_type_error: "A data deve é válida.",
        required_error: "A data é obrigatória."
    }).default(() => new Date())
});


export const mensagemValidator = (mensagem, partial = null) => {
  if (partial) {
      return mensagemSchema.partial(partial).safeParse(mensagem);
  }
  return mensagemSchema.safeParse(mensagem);
}

export async function create(mensagem) {
  const validated = mensagemValidator(mensagem);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.mensagem.create({
      data: validated.data
  });
}

export async function update(id, mensagem) {
  const validated = mensagemValidator(mensagem, true);
  if (!validated.success) {
      throw new Error(validated.error.errors.map(e => e.message).join(', '));
  }
  return await prisma.mensagem.update({
      where: { idMensagem: id },
      data: validated.data
  });
}

export async function getById(id) {
  return await prisma.mensagem.findUnique({
      where: { idMensagem: id }
  });
}

export async function list() {
  return await prisma.mensagem.findMany();
}

export async function remove(id) {
  return await prisma.mensagem.delete({
      where: { idMensagem: id }
  });
}