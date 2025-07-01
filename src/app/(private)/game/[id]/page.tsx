import { Game } from '@/features/game/containers/game';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <section>
            <Game id={id} />
        </section>
    );
}
