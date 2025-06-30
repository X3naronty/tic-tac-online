import { Game } from '@/features/game/containers/game';

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ join: string }>;
}) {
    const { id } = await params;
    const { join } = await searchParams;
    return (
        <section>
            <Game id={id} join={!!join}/>
        </section>
    );
}
