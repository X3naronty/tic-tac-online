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
        <div className="container mx-auto bg-transparent flex justify-center">
            <Card className="inline-flex bg-transparent gap-5 p-16">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Tic Tac Toe</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-10">
                    <CardDescription className="text-2xl flex flex-col gap-3 items-center">
                        <GameStatus game={game} />
                        <Players game={game}/>
                    </CardDescription>
                    <GameField game={game} onCellClick={makeMove} className="self-center" />
                </CardContent>
            </Card>
        </div>
    );
}
