import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

export const enderecoValidator = z.object({
  usuarioCpf: z.string().length(11, { message: "CPF deve ter 11 dígitos" }),
  apelido: z.string().max(100, { message: "Apelido muito longo" }),
  cep: z.string().length(8, { message: "CEP deve ter 8 dígitos" }),
  rua: z.string().max(255, { message: "Nome da rua muito longo" }),
  numero: z.string().max(10, { message: "Número muito longo" }),
  complemento: z.string().max(255).nullable().optional(),
  cidade: z.string().max(255, { message: "Nome da cidade muito longo" }),
  estado: z.string().length(2, { message: "Estado deve ter 2 caracteres" }),
  bairro: z.string().max(255, { message: "Nome do bairro muito longo" }), // Adicione o campo bairro
});

export async function create(endereco) {
  return await prisma.endereco.create({
    data: endereco,
  });
}

export async function update(id, endereco) {
  return await prisma.endereco.update({
    where: { idEndereco: id },
    data: endereco,
  });
}

export async function getById(id) {
  return await prisma.endereco.findUnique({
    where: { idEndereco: id },
  });
}

export async function list() {
  return await prisma.endereco.findMany();
}

export async function remove(id) {
  return await prisma.endereco.delete({
    where: { idEndereco: id },
  });
}