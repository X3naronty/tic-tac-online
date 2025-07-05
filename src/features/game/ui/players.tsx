import { GameDomain } from '@/entities/game';

export function Players({ game }: { game: GameDomain.GameEntity }) {
    const firstPlayer = game.status === 'idle' ? game.creator : game.players?.[0];
    const secondPlayer = game.status === 'idle' ? undefined : game.players?.[1];
    return (
        <div className="flex gap-20">
            <p>
                X - {firstPlayer.login} : {firstPlayer.rating}
            </p>
            <p>
                O - {secondPlayer?.login ?? '...'} : {secondPlayer?.rating ?? '...'}
            </p>
        </div>
    );
}
