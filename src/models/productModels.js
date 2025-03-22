import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function list() {
    const result = await prisma.product.findMany();
    return result;
}

export async function create(product) {
    const result = await prisma.product.create({
        data: product
    })
    return result
}

export async function remove(id){
    const result = await prisma.product.delete({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true
        }
    })
    return result
}

export async function getById(id){
    const result = await prisma.product.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true
        }
    })
    return result
}

export async function update( id, product) {
    const result = await prisma.product.update({
        where: {
            id: id
        },
        data: product,
        select:{
            id: true,
            name: true
        }
    })
    return result
}