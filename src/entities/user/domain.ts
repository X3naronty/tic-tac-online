export type User = {
    id: string;
    login: string;
    email: string;
    passwordHash: string;
    salt: string;
    rating: number;
};

export type SessionEntity = {
    id: string;
    login: string;
    expiresAt: string;
};

export const userToSession = (user: User, expiresAt: string): SessionEntity => {
    return {
        id: user.id,
        login: user.login,
        expiresAt,
    };
};
