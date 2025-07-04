'use client';

import { GameDomain } from '@/entities/game';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { GameStatus } from '../ui/status';
import { Players } from '../ui/players';
import { GameField } from '../ui/field';
import { useEffect, useState } from 'react';
import { useEventSource } from '@/shared/lib/sse/client';
import { useGame } from '../model/use-game';

export function GameClient({ defaultGame }: { defaultGame: GameDomain.GameEntity }) {
    const [game = defaultGame, error, isPending, makeMove] = useGame(defaultGame.id);
    // const game: GameDomain.GameEntity = {
    //     id: '1',
    //     creator: {
    //         id: '1',
    //         login: 'user1',
    //         rating: 1000,
    //     },
    //     field: ['X', 'X', 'X', null, null, null, null, null, null],
    //     status: 'idle',
    // };

    if (isPending || !game) {
        return <div>Loading...</div>;
    }

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
                        <GameField game={game} onCellClick={makeMove} />
                    </CardDescription>
                </CardContent>
            </Card>
        </>
    );
}
