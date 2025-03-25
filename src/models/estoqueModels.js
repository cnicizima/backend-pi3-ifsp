import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getById(id) {
    const result = await prisma.estoque.findUnique({
        where: {
            idEstoque: id
        }
    });
    return result;
}

export async function list() {
    const result = await prisma.estoque.findMany();
    return result;
}

export async function create(estoque) {
    const result = await prisma.estoque.create({
        data: estoque
    });
    return result;
}

export async function update(id, estoque) {
    const result = await prisma.estoque.update({
        where: {
            idEstoque: id
        },
        data: estoque
    });
    return result;
}

export async function remove(id) {
    const result = await prisma.estoque.delete({
        where: {
            idEstoque: id
        }
    });
    return result;
}
