import { GameDomain } from '@/entities/game';
import { useEventSource } from '@/shared/lib/sse/client';
import { useEffect, useState } from 'react';

export function useIdleGames() {
    const [data, error, isPending] = useEventSource<GameDomain.GameIdleEntity[]>('stream');

    return [data, error, isPending] as [GameDomain.GameIdleEntity[], unknown, boolean];
}
