import { leftFrom, rightFrom } from '@/shared/lib/either';
import { userRepository } from '../repositories/user';
import { passwordService } from './password';

export async function verifyUser({ login, password }: { login: string; password: string }) {
    const user = await userRepository.getUser({login});
    if(!user) {
        return leftFrom({message: 'Wrong login or password'});
    }
    
    const isCompare = passwordService.comparePasswords(user.passwordHash, password, user.salt);

    if(!isCompare) {
        return leftFrom({message: 'Wrong login or password'});
    }
    
    return rightFrom(user);
}
