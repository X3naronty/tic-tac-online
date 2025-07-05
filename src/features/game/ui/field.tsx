import { GameDomain } from '@/entities/game';
import { cn } from '@/shared/lib/css';
import { Button } from '@/shared/ui/button';

export function GameField({
    game,
    onCellClick,
    className
}: {
    game: GameDomain.GameEntity;
    onCellClick?: (index: number) => void;
    className?: string;
}) {
    const { field } = game;
    return (
        <div className={cn("inline-grid grid-cols-3 grid-rows-3", className)}>
            {field.map((cell, index) => (
                <button 
                onClick={(e) => onCellClick?.(index)} key={index}
                className={"w-15 h-15 border-1"}
                >
                    {cell ?? ''}
                </button>
            ))}
        </div>
    );
}
