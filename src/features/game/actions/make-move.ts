'use server';

import { makeMove } from '@/entities/game/domain';
import { gameRepository } from '@/entities/game/repositories/game';
import { getGameById, saveMove } from '@/entities/game/server';
import { getCurrentUser } from '@/entities/user/services/get-current-user';
import { gameEvents } from '../services/game-events';

type GameId = string;

export async function makeMoveAction(state: GameId, index: number) {
    const currentUser = await getCurrentUser();
    const game = await getGameById(state);

    console.log(gameEvents);
    if (currentUser.type === 'left' || !game || game.status !== 'inProgress') {
        return;
    }
    const result = await saveMove(game, currentUser.value, index);
    if (result.type === 'right') {
        gameEvents.emit(result.value);
    }
}
