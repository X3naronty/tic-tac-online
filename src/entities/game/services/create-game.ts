import { leftFrom, rightFrom } from '@/shared/lib/either';
import { Player } from '../domain';
import { gameRepository } from '../repositories/game';
export async function createGame(player: Player) {
    const playerGames = await gameRepository.fetchGamesList({
        players: { some: { id: player.id } },
        status: 'idle',
    });
    if (playerGames.length) {
        return leftFrom({ message: 'Player can create 1 only game' });
    }

    const newGame = await gameRepository.createGame({
        id: '',
        creator: player,
        status: 'idle',
        field: Array(9).fill(null),
    });

    return rightFrom(newGame);
}
