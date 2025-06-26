import { Alert, AlertDescription } from '@/shared/ui/alert';

export function ErrorMessage({ errors }: { errors?: string[] }) {
    if (errors?.length) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    {errors.map((error) => (
                        <p>{error}</p>
                    ))}
                </AlertDescription>
            </Alert>
        );
    }

    return null;
}
