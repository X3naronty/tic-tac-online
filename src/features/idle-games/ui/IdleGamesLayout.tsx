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
        <div>
            <CreateGameButton disabled={isPending} onClick={() => startTransition(onButtonClickAction)} />
            {!!(state?.type === 'left') && <CreateGameError error={state.error} />}
            {children}
        </div>
    );
}
