import { leftFrom, rightFrom } from '@/shared/lib/either';

export type GameEntity = GameIdleEntity | GameInProgressEntity | GameOverEntity | GameOverDrawEntity;

export type GameIdleEntity = {
    id: string;
    creator: Player;
    field: Field;
    status: `idle`;
};

export type GameInProgressEntity = {
    id: string;
    players: Player[];
    field: Field;
    status: `inProgress`;
};

export type GameOverEntity = {
    id: string;
    players: Player[];
    field: Field;
    status: `gameOver`;
    winner: Player;
};

export type GameOverDrawEntity = {
    id: string;
    players: Player[];
    field: Field;
    status: `gameOverDraw`;
};

export type Player = {
    id: string;
    login: string;
    email: string;
    rating: number;
};

export type Field = Cell[];
export type Cell = keyof typeof GameSymbol | null;

export const GameSymbol = {
    X: 'X',
    O: 'O',
};

export function getNextSymbol(game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity): Cell {
    const cellsLeft = game.field.filter((cell) => cell === null).length;
    return (cellsLeft % 2 ? GameSymbol.X : GameSymbol.O) as Cell;
}

export function getPlayerSymbol(game: GameInProgressEntity | GameOverEntity, player: Player) {
    const index = game.players.findIndex((p) => p.id === player.id);
    return { 0: GameSymbol.X, 1: GameSymbol.O }[index];
}

export function makeMove(game: GameInProgressEntity, player: Player, index: number) {
    const nextSymbol = getNextSymbol(game);
    const playerSymbol = getPlayerSymbol(game, player);

    if (index < 0 || index > 8) {
        return leftFrom({ message: 'Index is out of range' });
    }

    if (nextSymbol !== playerSymbol) {
        return leftFrom({ message: "Not player's turn" });
    }

    if (game.field[index]) {
        return leftFrom({ message: 'Cell is already set' });
    }

    const newField = game.field.map((cell, idx) => (idx == index ? nextSymbol : cell));

    if (calculateWinner(newField)) {
        return rightFrom({
            ...game,
            field: newField,
            winner: player,
            status: 'gameOver',
        } satisfies GameOverEntity);
    } 
     if (isDraw(newField)) {
        return rightFrom({
            ...game,
            field: newField,
            status: 'gameOverDraw',
        } satisfies GameOverDrawEntity);
    }

    return rightFrom({
        ...game,
        field: newField,
    } satisfies GameInProgressEntity);
}

function isDraw(squares: Field) {
    const winner = calculateWinner(squares);

    if (!winner) {
        return squares.every((cell) => cell !== null);
    }

    return false;
}

function calculateWinner(squares: Field) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return !!squares[a];
        }
    }
    return false;
}
