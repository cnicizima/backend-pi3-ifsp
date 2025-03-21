import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getById(id) {
    const result = await prisma.user.findUnique({
        where: {
            id: id
        }, select:{
            id: true,
            name: true,
            email: true,
        }
    })
    return result;
}

export async function list() {
    const result = await prisma.user.findMany({
        select:{
            id: true,
            name: true,
            email: true,
        }
    })
    return result;
}

export async function create(user) {
    const result = await prisma.user.create({
        data: user
    })
    return result;
}

export async function update(id, user){
    const result = await prisma.user.update({
        where: {
            id: id
        },
        date: user,
        select:{
            id: true,
            name: true,
            email: true,
        }
    })
    return result;
}

export async function remove(id) {
    const result = await prisma.user.delete({
        where: {
            id: id
        },
        select:{
            id: true,
            name: true,
            email: true,
        }
    })
    return result;
}