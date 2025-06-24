import { GameIdleEntity } from '@/entities/game/domain';

export type CreateError = {
    message: string;
}


export type CreateSuccess = GameIdleEntity;