import { useEffect, useState } from 'react';

export function useEventSource<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown | null>(null);
    const [isPending, setPending] = useState<boolean>(true);

    useEffect(() => {
        const gameEvents = new EventSource(url);
        gameEvents.addEventListener('message', (message) => {
            try {
                setPending(false);
                setData(JSON.parse(message.data));
                setError(null);
                console.log(1);
            } catch (e) {
                setError(e);
            }
        });

        gameEvents.addEventListener('error', (e) => {
            setError(e);
        });

        return () => {
            gameEvents.close();
        };
    }, [url]);

    return [data, error, isPending] as [T | null, unknown | null, boolean];
}
