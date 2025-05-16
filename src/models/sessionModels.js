import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function create(userId, client) {
    const result = await prisma.session.create({
        data: { userId: userId, client },
    })
    return result
}

export async function remove(sessionId, userId) {
    const result = await prisma.session.delete({
        where: {
            id: sessionId,
            userId: userId
        },
    })
    return result
}