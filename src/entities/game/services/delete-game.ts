import { GameEntity } from '../domain';
import { gameRepository } from '../repositories/game';

export async  function deleteGame(game: GameEntity) {
    await gameRepository.deleteGame(game);
}