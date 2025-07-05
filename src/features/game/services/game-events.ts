import { GameDomain } from '@/entities/game';
import { EventBrokerInstance } from '@/shared/lib/events';

type GameEvent = {
    type: 'game-change';
    value: GameDomain.GameEntity;
};

type Listener = (event: GameEvent) => void;

type GameId = string;

class GameEventsService {
    eventBroker = new EventBrokerInstance('game');

    async addListener(gameId: GameId, listener: Listener) {
        const removeListener = await this.eventBroker.listen(gameId, (data) => {
            listener(data as GameEvent);
        });

        return () => {
            removeListener();
        };
    }

    emit(game: GameDomain.GameEntity) {
        this.eventBroker.emit(game.id, {
            type: 'game-change',
            value: game,
        });
    }
}

export const gameEvents = new GameEventsService();
