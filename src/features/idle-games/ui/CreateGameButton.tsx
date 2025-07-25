'use client';

import { Button } from '@/shared/ui/button';
import { MouseEventHandler } from 'react';

interface Props {
    disabled: boolean;
    onClick: MouseEventHandler;
}

export function CreateGameButton({disabled, onClick}: Props) {
    return (
        <Button disabled={disabled} onClick={onClick}>Create new game</Button>
    );
}