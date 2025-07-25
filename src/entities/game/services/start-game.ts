import { leftFrom, rightFrom } from '@/shared/lib/either';
import { Player } from '../domain';
import { getGameById } from './get-game-by-id';
import { gameRepository } from '../repositories/game';
import { GameDomain } from '..';
import { idleGamesEvents } from '@/features/idle-games/services/idle-games-events';

export async function startGame(game: GameDomain.GameEntity, newPlayer: Player) {

    if(game.status !== 'idle') {
        return leftFrom({message: 'Game is already in progress'});
    }
    
    if(game.creator.id === newPlayer.id) {
        return leftFrom({message: 'Creator can not join the game'});
    }
    
    idleGamesEvents.emit({
        type: 'removeIdleGame',
        value: game
    });

    return rightFrom(await gameRepository.startGame(game.id, newPlayer));
}
