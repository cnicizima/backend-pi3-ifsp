import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();


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