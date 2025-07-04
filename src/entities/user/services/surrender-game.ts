import { gameRepository } from '@/entities/game/repositories/game';
import { getCurrentUser } from './get-current-user';
import { GameDomain } from '@/entities/game';
import { leftFrom, rightFrom } from '@/shared/lib/either';
import { User } from '../domain';

export async function surrenderGame(game: GameDomain.GameEntity, loser: User) {

    if (game.status === 'inProgress') {
        return rightFrom(
            await gameRepository.saveGame({
                ...game,
                status: 'gameOver',
                winner: game.players.find((player) => player.id !== loser.id)!,
            })
        );
    }
    else return leftFrom({message: 'unknown Error'});
}
