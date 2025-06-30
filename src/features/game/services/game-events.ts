import { GameDomain } from '@/entities/game';

type GameEvent = {
    type: 'game-change';
    value: GameDomain.GameEntity;
};

type Listener = (event: GameEvent) => void;

type GameId = string;

class GameEventsService {
    listeners = new Map<GameId, Set<Listener>>();

    addListener(gameId: GameId, listener: Listener) {
        let listeners = this.listeners.get(gameId);
        if (!listeners) {
            listeners = new Set([listener]);
            this.listeners.set(gameId, listeners);
        }

        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    }

    emit(game: GameDomain.GameEntity) {
        const listeners = this.listeners.get(game.id) ?? new Set([]);
        for (const listener of listeners) {
            listener({type: 'game-change', value: game});
        }
    }
}

export const gameEvents = new GameEventsService();