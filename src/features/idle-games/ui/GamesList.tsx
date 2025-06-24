import { getIdleGames } from '@/entities/game/server';
import { GameCard } from './GameCard';

export async function GamesList() {
    const games = await getIdleGames();
    return (
        <ul className="grid grid-cols-2 gap-4">
            {games.map((game) => (
                <li key={game.id}>
                    <GameCard login={game.creator.login} rating={game.creator.rating} />
                </li>
            ))}
        </ul>
    );
}
