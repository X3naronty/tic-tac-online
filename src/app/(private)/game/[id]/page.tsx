import { Game } from '@/features/game/containers/game';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <section className="py-25">
            <Game id={id} />
        </section>
    );
}
