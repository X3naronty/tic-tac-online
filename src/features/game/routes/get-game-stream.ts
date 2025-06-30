import { getGameById } from '@/entities/game/server';
import { sseStream } from '@/shared/lib/sse/server';
import { NextRequest } from 'next/server';
import { gameEvents } from '../services/game-events';

export async function getGameStream(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const game = await getGameById(id);
    if (!game) {
        return new Response('Game not found:(', {
            status: 404,
        });
    }

    const { response, write, close, setDisconnectHandler } = sseStream(req);
   
    write(game);
    const onDisconnect = gameEvents.addListener(id, (event) => {
        write(event.value);
    });
    setDisconnectHandler(() => {
        onDisconnect();
        close();
    });

    return response;
}
