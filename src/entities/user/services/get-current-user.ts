import { leftFrom, rightFrom } from '@/shared/lib/either';
import { userRepository } from '../repositories/user';
import { sessionService } from './session';

export async function getCurrentUser() {
    const { session } = await sessionService.verifySession();
    const getUserResult = await userRepository.getUser({id: session.id});
    
    if(!getUserResult) {
        return leftFrom({message: 'User not found'});
    }
    return rightFrom(getUserResult);
}