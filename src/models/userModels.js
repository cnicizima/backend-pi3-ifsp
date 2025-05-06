import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const userSchema = z.object({
  cpf: z.string().length(11, { message: "CPF deve ter 11 dígitos" }),

  nome: z
    .string({
      invalid_type_error: "O nome deve ser uma string.",
      required_error: "O nome é obrigatório.",
    })
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
    .max(255, { message: "O nome deve ter no máximo 255 caracteres." }),

  email: z
    .string({
      invalid_type_error: "O email deve ser uma string.",
      required_error: "O email é obrigatório.",
    })
    .email({ message: "Email inválido" })
    .max(255, { message: "O email deve ter no máximo 255 caracteres." }),

  sexo: z.string().max(30).nullable(),

  telefone: z.string().min(10).max(15, { message: "Telefone inválido" }),

  nascimento: z
    .string()
    .regex(/^\d{8}$/, { message: "A data de nascimento deve estar no formato ddmmyyyy." }),

  password: z
    .string({
      invalid_type_error: "A senha deve ser uma string.",
      required_error: "A senha é obrigatória.",
    })
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),

  isAdmin: z.boolean().optional(),

  avatar: z.string().url({ message: "O avatar deve ser uma URL válida." }).nullable(),
});

export const userValidator = (user, partial = null) => {
  if (partial) {
    return userSchema.partial(partial).safeParse(user);
  }
  return userSchema.safeParse(user);
};

export async function getById(id) {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return result;
}


export async function getByemail(email) {
  const result = await prisma.user.findUnique({
    where: {
      email
    },
  });
  return result;
}


export async function list() {
  const result = await prisma.user.findMany();
  return result;
}

export async function create(user) {
  const result = await prisma.user.create({
    data: user,
  });
  return result;
}

export async function update(id, user) {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: user,
  });
  return result;
}

export async function remove(id) {
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return result;
}
