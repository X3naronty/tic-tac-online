import { IdleGames } from '@/features/idle-games/server';

export default async function Home() {
    return (
        <main className="">
            <section className="flex flex-col gap-4 container mx-auto pt-[100px]">
                <h1 className="text-4xl">Available games</h1>

                <IdleGames />
            </section>
        </main>
    );
}
