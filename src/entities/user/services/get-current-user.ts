import { userRepository } from '../repositories/user';
import { sessionService } from './session';

export async function getCurrentUser() {
    const { session } = await sessionService.verifySession();
    return await userRepository.getUser({id: session.id});
}