'use server';

import { createUser, sessionService } from '@/entities/user/server';
import { leftFrom } from '@/shared/lib/either';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const formDataSchema = z.object({
    login: z.string().min(3),
    email: z.string(),
    password: z.string().min(3),
    'verify-password': z.string(),
});

type FormState = {
    formData?: FormData;
    errors?: {
        login?: string[];
        email?: string[];
        password?: string[];
        'verify-password'?: string[];
        _errors?: string[];
    };
};

export async function signUpAction(state: unknown, formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const result = formDataSchema.safeParse(data);
    if (!result.success) {
        const formattedErrors = result.error.format();
        return {
            formData,
            errors: {
                login: formattedErrors.login?._errors,
                email: formattedErrors.login?._errors,
                password: formattedErrors.password?._errors,
                'verify-password': formattedErrors['verify-password']?._errors,
                _errors: formattedErrors._errors,
            },
        };
    }

    const createUserResult = await createUser(result.data);
    if (createUserResult.type === 'right') {
        await sessionService.createSession(createUserResult.value);
        redirect('/');
    }

    return {
        formData,
        errors: {
            _errors: [createUserResult.error.message],
        },
    };
}
