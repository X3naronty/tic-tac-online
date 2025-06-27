'use server';

import { GameIdleEntity } from '@/entities/game/domain';
import { createGame } from '@/entities/game/server';
import prisma from '@/shared/lib/db';
import { Either, leftFrom } from '@/shared/lib/either';
import { CreateError, CreateSuccess } from '../model/create-game-types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/entities/user/services/get-current-user';

export const createGameAction = async (state: Either<CreateError, CreateSuccess> | null) => {
    const user = await getCurrentUser();
    
    if (!user) {
        return leftFrom({message: 'User not found'});
    }

    const result = await createGame(user);

    if(result.type === 'right') {
        redirect(`/game/${result.value.id}`);
    }

    return result;
};
