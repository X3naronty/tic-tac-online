import { GameDomain } from '@/entities/game';

export function Players({game}: {game: GameDomain.GameEntity}) {
    const firstPlayer = game.status === 'idle' ? game.creator : game.players?.[0];
    const secondPlayer = game.status === 'idle' ? undefined : game.players?.[1];
    return(<p>
        <div>
            X - {firstPlayer.login} : {firstPlayer.rating}
        </div>
        <div>
            O - {secondPlayer?.login ?? '...'} : {secondPlayer?.rating ?? '...'}
        </div>
    </p>);
}