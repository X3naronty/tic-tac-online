import { GameDomain } from '@/entities/game';

export function GameStatus({ game }: { game: GameDomain.GameEntity }) {
    const { status } = game;

    return (
        <p>
            {(() => {
                switch (status) {
                    case 'idle': {
                        return <>Waiting for second player</>;
                    }
                    case 'inProgress': {
                        const currentSymbol = GameDomain.getNextSymbol(game);
                        return <>Turn: {currentSymbol}</>;
                    }
                    case 'gameOver': {
                        const currentSymbol = GameDomain.getNextSymbol(game);
                        return (
                            <>
                                Winner: {game.winner.login} - {currentSymbol}
                            </>
                        );
                    }
                    case 'gameOverDraw': {
                        return <>Draw</>;
                    }
                }
            })()}
        </p>
    );
}
