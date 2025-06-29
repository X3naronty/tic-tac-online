import { gameRepository } from '../repositories/game';

export async function getGameById(id: string) {
    const game = await gameRepository.fetchGameBy({id});
    return game;
}