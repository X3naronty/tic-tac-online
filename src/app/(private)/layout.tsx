import { sessionService } from '@/entities/user/server';
import { Button } from '@/shared/ui/button';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await sessionService.verifySession();

    return (
        <>
            <header>
                <div className="">
                    <div className="">online-tic-tac-toe</div>
                    <div className="">
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
