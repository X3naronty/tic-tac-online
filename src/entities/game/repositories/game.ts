import type {
    GameEntity,
    GameIdleEntity,
    GameInProgressEntity,
    GameOverDrawEntity,
    GameOverEntity,
} from '@/entities/game/domain';
import prisma from '@/shared/lib/db';
import type { Game, Prisma, User } from '@prisma/client';
import { z } from 'zod';

export const gameRepository = {
    fetchGamesList,
    createGame
};

async function createGame(game: GameIdleEntity): Promise<GameIdleEntity> {
    const newGame = await prisma.game.create({
        data: {
            status: game.status,
            field: Array(9).fill(null),
            players: {
                connect: { id: game.creator.id },
            },
        },
        include: {
            players: true,
            winner: true,
        },
    });

    return dbGameToEntity(newGame) as GameIdleEntity;
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));

async function fetchGamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
    const games = await prisma.game.findMany({
        where,
        include: {
            winner: true,
            players: true,
        },
    });

    return games.map(dbGameToEntity);
}

function dbGameToEntity(
    game: Game & {
        players: User[];
        winner: User | null;
    }
): GameEntity {
    switch (game.status) {
        case 'idle': {
            if (!game.players) {
                throw new Error('Game has no players');
            }
            const creator = game.players[0];
            return {
                id: game.id,
                creator: creator,
                status: 'idle',
            } satisfies GameIdleEntity;
        }
        case 'inProgress': {
            return {
                id: game.id,
                players: game.players,
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
                players: game.players,
                field: fieldSchema.parse(game.field),
                status: 'gameOver',
                winner: game.winner,
            } satisfies GameOverEntity;
        }
        case 'gameOverDraw': {
            return {
                id: game.id,
                players: game.players,
                field: fieldSchema.parse(game.field),
                status: 'gameOverDraw',
            } satisfies GameOverDrawEntity;
        }
    }
}
