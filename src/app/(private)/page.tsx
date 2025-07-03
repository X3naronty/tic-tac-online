import { IdleGames } from '@/features/idle-games/server';

export default async function Home() {
    return (
        <main className="">
            <section className="container mx-auto pt-[60px]">
                <IdleGames />
            </section>
        </main>
    );
}
