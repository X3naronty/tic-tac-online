import { GameDomain } from '@/entities/game';
import { Button } from '@/shared/ui/button';

export function GameField({
    game,
    onCellClick,
}: {
    game: GameDomain.GameEntity;
    onCellClick?: (index: number) => void;
}) {
    const { field } = game;
    return (
        <div>
            {field.map((cell, index) => (
                <Button key={index}>{cell ?? ''}</Button>
            ))}
        </div>
    ); 
}
