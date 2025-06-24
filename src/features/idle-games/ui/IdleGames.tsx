import { getIdleGames } from '@/entities/game/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { GameCard } from './GameCard';
import { CreateGameButton } from './CreateGameButton';
import { GamesList } from './GamesList';
import { createGameAction } from '../actions/create-game';
import { useActionState } from 'react';
import { rightFrom } from '@/shared/lib/either';
import { CreateGameError } from './CreateGameError';
import { IdleGamesLayout } from './IdleGamesLayout';

export function IdleGames() {
    return (
        <div className="flex flex-col items-center">
            <IdleGamesLayout>
                <GamesList/>
            </IdleGamesLayout>
        </div>
    );
}
