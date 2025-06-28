'use client';

import { GameDomain } from '@/entities/game';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { GameStatus } from '../ui/status';
import { Players } from '../ui/players';
import { GameField } from '../ui/field';
import { useEffect, useState } from 'react';
import { useEventSource } from '@/shared/lib/sse/client';
import { useGame } from '../model/use-game';

export function Game({ id }: { id: string }) {
    
    const game: GameDomain.GameEntity = {
        id: '1',
        creator: {
            id: '1',
            login: 'user1',
            rating: 1000,
        },
        field: ['X', 'X', 'X', null, null, null, null, null, null],
        status: 'idle',
    };

  
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Tic Tac Online</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        <GameStatus game={game} />
                        <Players game={game} />
                        <GameField game={game} />
                    </CardDescription>
                </CardContent>
            </Card>
        </>
    );
}
