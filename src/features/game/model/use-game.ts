import { GameDomain } from '@/entities/game';
import { useEventSource } from '@/shared/lib/sse/client';
import { useTransition } from 'react';
import { makeMoveAction } from '../actions/make-move';

export function useGame(gameId: string) {
    const [data, error, isPending] = useEventSource<GameDomain.GameEntity>(`/game/${gameId}/stream`);

    const [isTransitionPending, startTransition] = useTransition();

    const makeMove = (index: number) => {
        startTransition(async () => {
            await makeMoveAction(gameId, index);
        });
    };

    return [data, error, isPending || isTransitionPending, makeMove] as [
        GameDomain.GameEntity | null,
        unknown,
        boolean,
        (index: number) => void,
    ];
}
