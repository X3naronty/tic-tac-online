import { getCurrentUser } from '@/entities/user/services/get-current-user';
import { GameClient } from './game-client';
import { getGameById } from '@/entities/game/server';
import { startGame } from '@/entities/game/services/start-game';
import { gameEvents } from '../services/game-events';

export async function Game({ id }: { id: string }) {
    const getUserResult = await getCurrentUser();
    if (getUserResult.type === 'left') {
        return <div>User does not exist</div>;
    }

    const user = getUserResult.value;
    let game = await getGameById(id);

    if (!game) {
        return <div>Game not found</div>;
    }

    console.log(gameEvents);

    if (game.status == 'idle' && game.creator.login !== user.login) {
        const startGameResult = await startGame(game, user);
        if (startGameResult.type === 'right') {
            game = startGameResult.value;
            gameEvents.emit(startGameResult.value);
        } else {
            return <div>{startGameResult.error.message}</div>;
        }
    }

    return <GameClient defaultGame={game} />;
}
