import { leftFrom, rightFrom } from '@/shared/lib/either';
import { userRepository } from '../repositories/user'
import { passwordService } from './password';
import  cuid  from 'cuid';

export async function createUser({
    login, 
    email,
    password
}:
{
    login: string,
    email: string,
    password: string
}) {
    const userWithLogin = await userRepository.getUser({login});

    if(userWithLogin) {
        return leftFrom({message: "User with such a login already exists"});
    }
    
    const {hash, salt} = await passwordService.hashPassword(password);
    
    const user = await userRepository.saveUser({
        id: cuid(), // set by database
        login: login,
        email: email, 
        passwordHash: hash,
        salt: salt,
        rating: 1000
    });
    
    return rightFrom(user);
}