import { getGameById, getIdleGames } from '@/entities/game/server';
import { sseStream } from '@/shared/lib/sse/server';
import { NextRequest } from 'next/server';
import { surrenderGame } from '@/entities/user/server';
import { getCurrentUser } from '@/entities/user/services/get-current-user';
import { idleGamesEvents } from '../services/idle-games-events';
import { GameDomain } from '@/entities/game';
import { GameIdleEntity } from '@/entities/game/domain';

export async function getIdleGamesStream(req: NextRequest) {
    let games = await getIdleGames();
    const { response, write, close, setDisconnectHandler } = sseStream(req);
   
    write(games);
    const removeListeners = await idleGamesEvents.addListener((event) => {
        if(event.type === 'addIdleGame') {
            games = [...games, event.value as GameIdleEntity];
            write(games);
        } else {
            games = games.filter((game) => game.id !== event.value.id);
            write(games);
        }
    });

    setDisconnectHandler( async () => {
        removeListeners();
        close();
    });

    return response;
}
