import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const estoqueSchema = z.object({
    idEstoque: z.number({
        invalid_type_error: "O id deve ser um valor numérico.",
        required_error: "O id é obrigatório."
    }).optional(),

    idProduto: z.number({
        invalid_type_error: "O id do produto deve ser um valor numérico.",
        required_error: "O id do produto é obrigatório."
    }),

    quantidade: z.number({
        invalid_type_error: "A quantidade deve ser um valor numérico.",
        required_error: "A quantidade é obrigatória."
    }).min(0, { message: "A quantidade não pode ser negativa" })
});

export const estoqueValidator = (estoque, partial = null) => {
    if (partial) {
        return estoqueSchema.partial(partial).safeParse(estoque);
    }
    return estoqueSchema.safeParse(estoque);
}

export async function create(estoque) {
    const validated = estoqueValidator(estoque);
    if (!validated.success) {
        throw new Error(validated.error.errors.map(e => e.message).join(', '));
    }
    return await prisma.estoque.create({
        data: validated.data
    });
}

export async function update(id, estoque) {
    const validated = estoqueValidator(estoque, true);
    if (!validated.success) {
        throw new Error(validated.error.errors.map(e => e.message).join(', '));
    }
    return await prisma.estoque.update({
        where: { idEstoque: id },
        data: validated.data
    });
}

export async function getById(id) {
    return await prisma.estoque.findUnique({
        where: { idEstoque: id }
    });
}

export async function list() {
    return await prisma.estoque.findMany();
}

export async function remove(id) {
    return await prisma.estoque.delete({
        where: { idEstoque: id }
    });
}