import { CreateError} from '@/features/idle-games/model/create-game-types';

interface Props {
    error: CreateError;
}

export function CreateGameError({error}: Props) {
    return (
        <div className="text-red-600" aria-live="polite" aria-atomic="true">
            <p>
                {!!error?.message && error.message}
            </p>
        </div>
    )
}