import { leftFrom, rightFrom } from '@/shared/lib/either';
import { User } from '@prisma/client';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { SessionEntity, userToSession } from '../domain';
import { userRepository } from '../repositories/user';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionEntity) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return rightFrom(payload as SessionEntity);
    } catch (error) {
        return leftFrom({ message: 'Failed to verify session' });
    }
}

export async function createSession(user: User) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const sessionData = userToSession(user, expiresAt.toISOString());

    const session = await encrypt(sessionData);
    const cookieStore = await cookies();

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function updateSession() {

    const session = (await cookies()).get('session')?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}

export const verifySession = async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if (session.type === 'left') {
        redirect('/log-in');
    }

    return { isAuth: true, session: session.value };
};

export const sessionService = { createSession, deleteSession, verifySession };
