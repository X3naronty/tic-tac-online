import { pbkdf2, randomBytes } from 'crypto';

async function hashPassword(password: string, salt = randomBytes(16).toString('hex')) {
    const hash = await new Promise<Buffer>((resolve, reject) =>
        pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedHash) => (err ? reject(err) : resolve(derivedHash)))
    );

    return {
        hash: hash.toString('hex'),
        salt,
    };
}

async function comparePasswords(hash: string, password: string, salt: string) {
    return hash === (await hashPassword(password, salt)).hash;
}

export const passwordService = { hashPassword, comparePasswords };
 