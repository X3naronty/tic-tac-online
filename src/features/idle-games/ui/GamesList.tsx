'use client';

import { getIdleGames } from '@/entities/game/server';
import { GameCard } from './GameCard';
import { useIdleGames } from '../hooks/use-idle-games';

export function GamesList() {
    const [games, error, idPending] = useIdleGames();
    // const games = await getIdleGames();
    return (
        <ul className="grid grid-cols-2 gap-4 w-[100%]">
            {games?.map((game) => (
                <li key={game.id}>
                    <GameCard id={game.id} login={game.creator.login} rating={game.creator.rating} />
                </li>
            ))}
        </ul>
    );
}
