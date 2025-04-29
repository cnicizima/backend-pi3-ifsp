import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const mensagemValidator = z.object({
  usuarioCpf: z.string().length(11, { message: "CPF deve ter 11 dígitos." }),
  assunto: z.string().max(255, { message: "Assunto muito longo." }),
  conteudo: z.string({ required_error: "Conteúdo é obrigatório." }),
  dataEnvio: z.coerce.date().default(() => new Date()), // Coerce to Date
});

export async function create(mensagem) {
  return await prisma.mensagem.create({
    data: mensagem,
  });
}

export async function update(id, mensagem) {
  return await prisma.mensagem.update({
    where: { idMensagem: id },
    data: mensagem,
  });
}

export async function getById(id) {
  return await prisma.mensagem.findUnique({
    where: { idMensagem: id },
  });
}

export async function list() {
  return await prisma.mensagem.findMany();
}

export async function remove(id) {
  return await prisma.mensagem.delete({
    where: { idMensagem: id },
  });
}