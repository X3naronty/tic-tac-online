import { sessionService } from '@/entities/user/server';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await sessionService.verifySession();

    return (
        <>
            <header>
                <div className="flex items-center p-6 justify-between border-b-1 border-b-stone-500">
                    <Link href="/" className="">TIC TAC TOE</Link>
                    <div className="flex items-center gap-5">
                        {session.session.login}
                        <form action={
                            async ()  => {
                                'use server';
                                await sessionService.deleteSession();
                                redirect('/log-in');
                            } 
                        }>
                            <Button>Sign out</Button>
                        </form>
                    </div>
                </div>
            </header>
            <main>{children}</main>
        </>
    );
}
