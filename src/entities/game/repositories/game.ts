import type {
    GameEntity,
    GameIdleEntity,
    GameInProgressEntity,
    GameOverDrawEntity,
    GameOverEntity,
    Player,
} from '@/entities/game/domain';
import prisma from '@/shared/lib/db';
import { Game, GamePlayer, Prisma, User } from '@prisma/client';
import { z } from 'zod';
import { GameDomain } from '..';

const fieldSchema = z.array(z.union([z.literal('X'), z.literal('O'), z.null()]));

async function createGame(game: GameIdleEntity): Promise<GameIdleEntity> {
    const newGame = await prisma.game.create({
        data: {
            status: game.status,
            field: game.field,
            players: {
                create: {
                    index: 0,
                    userId: game.creator.id,
                },
            },
        },
        include: {
            players: {
                include: {
                    user: true,
                },
            },
            winner: true,
        },
    });

    return dbGameToEntity(newGame) as GameIdleEntity;
}

async function fetchGameBy(where?: Prisma.GameWhereInput) {
    const game = await prisma.game.findFirst({
        where,
        include: {
            winner: true,
            players: {
                include: {
                    user: true,
                },
            },
        },
    });
    if (game) {
        return dbGameToEntity(game);
    } else {
        return null;
    }
}

async function startGame(gameId: string, player: Player) {
    return dbGameToEntity(
        await prisma.game.update({
            where: { id: gameId },
            data: {
                players: {
                    create: {
                        userId: player.id,
                        index: 1,
                    },
                },
                status: 'inProgress',
            },
            include: {
                winner: true,
                players: {
                    include: {
                        user: true,
                    },
                },
            },
        })
    );
}

async function saveGame(game: GameInProgressEntity | GameOverDrawEntity | GameOverEntity) {
    return dbGameToEntity(
        await prisma.game.update({
            where: { id: game.id },
            data: {
                status: game.status,
                winnerId: 'winner' in game ? game.winner.id : null,
                field: game.field,
            },
            include: {
                winner: true,
                players: {
                    include: {
                        user: true,
                    }
                }
            }
        })
    );
}
let a:Prisma.GameWhereInput;
async function fetchGamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
    const games = await prisma.game.findMany({
        where,
        include: {
            winner: true,
            players: {
                include: {
                    user: true,
                },
            },
        },
    });

    return games.map(dbGameToEntity);
}

function dbGameToEntity(
    game: Game & {
        players: (GamePlayer & { user: User })[];
        winner: User | null;
    }
): GameEntity {
    const players = game.players.sort((a, b) => a.index - b.index).map(dbPlayerToPlayer);

    switch (game.status) {
        case 'idle': {
            if (!players.length) {
                throw new Error('Game has no players');
            }
            const creator = players[0];
            return {
                id: game.id,
                creator: creator,
                status: 'idle',
                field: fieldSchema.parse(game.field),
            } satisfies GameIdleEntity;
        }
        case 'inProgress': {
            return {
                id: game.id,
                players: players,
                field: fieldSchema.parse(game.field),
                status: 'inProgress',
            } satisfies GameInProgressEntity;
        }
        case 'gameOver': {
            if (!game.winner) {
                throw new Error('Winner has to be in the game over');
            }
            return {
                id: game.id,
                players: players,
                field: fieldSchema.parse(game.field),
                status: 'gameOver',
                winner: game.winner,
            } satisfies GameOverEntity;
        }
        case 'gameOverDraw': {
            return {
                id: game.id,
                players: players,
                field: fieldSchema.parse(game.field),
                status: 'gameOverDraw',
            } satisfies GameOverDrawEntity;
        }
    }
}

function dbPlayerToPlayer(dbPlayer: GamePlayer & { user: User }): Player {
    return {
        id: dbPlayer.user.id,
        login: dbPlayer.user.login,
        email: dbPlayer.user.email,
        rating: dbPlayer.user.rating,
    };
}

export const gameRepository = {
    fetchGamesList,
    createGame,
    fetchGameBy,
    startGame,
    saveGame,
    
};
