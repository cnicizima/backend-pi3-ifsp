import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const userSchema = z.object({
    id: z.number().optional(),
    cpf: z.string()
        .length(11, "CPF deve ter exatamente 11 caracteres")
        .regex(/^\d+$/, "CPF deve conter apenas números"),
    nome: z.string()
        .min(3, "Nome é obrigatório e deve conter no mínimo 3 letras")
        .max(255, "Nome deve ter no máximo 255 caracteres"),
    email: z.string()
        .email("Email inválido")
        .max(255, "Email deve ter no máximo 255 caracteres"),
    sexo: z.string()
        .max(30, "Sexo deve ter no máximo 30 caracteres")
        .optional(),
    telefone: z.string()
        .min(10, "Telefone é obrigatório")
        .max(15, "Telefone deve ter no máximo 15 caracteres"),
    nascimento: z.string() // o dado DEVE VIR DO FRONTEND COMO DDMMYYYY. USAR mascara para mostrar para o usuario.
        .regex(/^\d{8}$/, "Data deve conter 8 dígitos no formato DDMMYYYY")
        .transform((date) => {
            const day = date.slice(0, 2);
            const month = date.slice(2, 4);
            const year = date.slice(4);
            return new Date(`${year}-${month}-${day}`);
        })
        .refine((date) => !isNaN(date.getTime()), {
            message: "Data inválida"
        }),
    password: z.string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .max(255, "Senha deve ter no máximo 255 caracteres"),
    isAdmin: z.boolean()
        .default(false),
    avatar: z.string()
        .url("URL inválida para avatar")
        .optional()
})

//se a pessoa não passar nada, partial é null. 
export const userValidator = (user, partial = null) => {
    if (partial) {
        return userSchema.partial(partial).safeParse(user)
    }
    return userSchema.safeParse(user)
}

export async function getById(id) {
    const result = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return result;
}

export async function list() {
    const result = await prisma.user.findMany()
    return result;
}

export async function create(user) {
    const result = await prisma.user.create({
        data: user
    })
    return result;
}

export async function update(id, user) {
    const result = await prisma.user.update({
        where: {
            id: id
        },
        data: user
    })
    return result;
}

export async function remove(id) {
    const result = await prisma.user.delete({
        where: {
            id: id
        }
    })
    return result;
}