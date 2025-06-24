export type GameEntity = GameIdleEntity | GameInProgressEntity | GameOverEntity | GameOverDrawEntity;

export type GameIdleEntity = {
    id: string;
    creator: Player;
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
}

export type GameOverDrawEntity = {
    id: string;
    players: Player[];
    field: Field;
    status: `gameOverDraw`
}

export type Player = {
    id: string;
    login: string;
    rating: number;
}


export type Field = Cell[];
export type Cell = GameSymbol | null;
export type GameSymbol = string;