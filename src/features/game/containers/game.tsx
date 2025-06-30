import { getCurrentUser } from '@/entities/user/services/get-current-user';
import { GameClient } from './game-client';
import { getGameById } from '@/entities/game/server';
import { startGame } from '@/entities/game/services/start-game';
import { gameEvents } from '../services/game-events';

export async function Game({ id, join }: { id: string; join: boolean }) {
    const getUserResult = await getCurrentUser();
    if (getUserResult.type === 'left') {
        return <div>User does not exist</div>;
    }
    let game = await getGameById(id);

    if (!game) {
        return <div>Game not found</div>;
    }
    console.log(getUserResult.value.login);
    console.log(gameEvents);
    if (join) {
        const startGameResult = await startGame(game, getUserResult.value);
        if (startGameResult.type === 'right') {
            game = startGameResult.value;
            gameEvents.emit(startGameResult.value);
        } else {
            return <div>{startGameResult.error.message}</div>;
        }
    }

    return <GameClient defaultGame={game} />;
}
