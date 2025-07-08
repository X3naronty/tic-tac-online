'use server';

import { createGame } from '@/entities/game/server';
import { getCurrentUser } from '@/entities/user/services/get-current-user';
import { Either } from '@/shared/lib/either';
import { redirect } from 'next/navigation';
import { CreateError, CreateSuccess } from '../model/create-game-types';
import { idleGamesEvents } from '../services/idle-games-events';

export const createGameAction = async (state: Either<CreateError, CreateSuccess> | null) => {
    const getUserResult = await getCurrentUser();

    if (getUserResult.type === 'left') {
        return getUserResult;
    }

    const result = await createGame(getUserResult.value);

    if (result.type === 'right') {
        idleGamesEvents.emit({
            type: 'addIdleGame',
            value: result.value,
        });

        redirect(`/game/${result.value.id}`);
    }

    return result;
};
