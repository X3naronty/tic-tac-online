import { GameIdleEntity } from '@/entities/game/domain';
import { gameRepository } from '../repositories/game';

export async function getIdleGames(): Promise<GameIdleEntity[]> {
    const games = await gameRepository.fetchGamesList({
        status: 'idle',
    });

    return games as GameIdleEntity[];
}
