import { leftFrom, rightFrom } from '@/shared/lib/either';
import { GameDomain } from '..';
import { getNextSymbol, getPlayerSymbol, makeMove } from '../domain';
import { gameRepository } from '../repositories/game';

export async function saveMove(game: GameDomain.GameInProgressEntity, player: GameDomain.Player, index: number) {
    const makeMoveResult = makeMove(game, player, index);
    if (makeMoveResult.type === 'left') {
        return makeMoveResult;
    }
    return rightFrom(await gameRepository.saveGame(makeMoveResult.value));
}
