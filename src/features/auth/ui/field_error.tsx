export function FieldError({ id, errors }: { id: string; errors?: string[] }) {
    if (errors?.length) {
        return (
            <div id={id} aria-live="polite" aria-atomic="true" className="text-red-500">
                {errors.map((error, idx) => (
                    <p key={idx}>{error}</p>
                ))}
            </div>
        );
    }

    return null;
}
