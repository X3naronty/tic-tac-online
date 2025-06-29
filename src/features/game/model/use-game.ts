import { GameDomain } from '@/entities/game';
import { useEventSource } from '@/shared/lib/sse/client';

export function useGame(gameId: string) {
    const [data, error, isPending] = useEventSource<GameDomain.GameEntity>(`/game/${gameId}/stream`);
    return [data, error, isPending] as [GameDomain.GameEntity | null, unknown, boolean];
}