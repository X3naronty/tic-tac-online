'use client';

import { createGameAction } from '@/features/idle-games/actions/create-game';
import React, { startTransition, useActionState } from 'react';
import { CreateGameButton } from './CreateGameButton';
import { CreateGameError } from './CreateGameError';

interface Props {
    children?: React.ReactNode;
}

export function IdleGamesLayout({ children }: Props) {
    const [state, onButtonClickAction, isPending] = useActionState(createGameAction, null);
    return (
        <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl text-center">Available games</h1>

            <div className="flex flex-col items-center gap-2">
                <CreateGameButton disabled={isPending} onClick={() => startTransition(onButtonClickAction)} />
                {!!(state?.type === 'left') && <CreateGameError error={state.error} />}
            </div>
            {children}
        </div>
    );
}
