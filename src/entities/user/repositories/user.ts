import { Prisma } from '@prisma/client';
import { User } from '../domain';
import prisma from '@/shared/lib/db';

async function saveUser(user: User): Promise<User> {
    return await prisma.user.upsert({
        where: {
            id: user.id,
        },
        create: user,
        update: user,
    });
}

async function getUser(where: Prisma.UserWhereInput): Promise<User | null> {
    return await prisma.user.findFirst({
        where,
    });
}

export const userRepository = { saveUser, getUser };
