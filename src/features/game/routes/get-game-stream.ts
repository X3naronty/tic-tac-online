import { getGameById } from '@/entities/game/server';
import { sseStream } from '@/shared/lib/sse/server';
import { NextRequest } from 'next/server';
import { gameEvents } from '../services/game-events';
import { surrenderGame } from '@/entities/user/server';
import { getCurrentUser } from '@/entities/user/services/get-current-user';

export async function getGameStream(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const game = await getGameById(id);
    const user = await getCurrentUser();
    if (!game || user.type === 'left') {
        return new Response('Game or user not found:(', {
            status: 404,
        });
    }
    console.log(gameEvents);
    const { response, write, close, setDisconnectHandler } = sseStream(req);
   
    write(game);
    const removeListeners = await gameEvents.addListener(id, (event) => {
        write(event.value);
    });

    setDisconnectHandler( async () => {
        const result = await surrenderGame(game, user.value);
        if(result.type === 'right') {
            gameEvents.emit(result.value);
        }
        removeListeners();
        close();
    });

    return response;
}
