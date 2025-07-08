import { GameDomain } from '@/entities/game';
import { EventBrokerInstance } from '@/shared/lib/events';

type GameEvent = {
    type: 'addIdleGame' | 'removeIdleGame';
    value: GameDomain.GameEntity;
};

type Listener = (event: GameEvent) => void;

type GameId = string;

class IdleGamesEventsService {
    eventBroker = new EventBrokerInstance('idle-games');

    async addListener(listener: Listener) {
        const removeListener = await this.eventBroker.listen('', (data) => {
            listener(data as GameEvent);
        });

        return () => {
            removeListener();
        };
    }

    emit(event: GameEvent) {
        this.eventBroker.emit('', event);
    }
}

export const idleGamesEvents = new IdleGamesEventsService();
