'use server';

import { sessionService, verifyUser } from '@/entities/user/server';
import { leftFrom } from '@/shared/lib/either';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const formDataSchema = z.object({
    login: z.string().min(3),
    password: z.string().min(3),
});

type FormState = {
    formData?: FormData;
    errors?: {
        login?: string[];
        password?: string[];
        _errors?: string[];
    };
};

export async function logInAction(state: unknown, formData: FormData): Promise<FormState> {
    const data = Object.fromEntries(formData.entries());
    const result = formDataSchema.safeParse(data);
    console.log(2);
    if (!result.success) {
        const formattedErrors = result.error.format();
        console.log(2);
        return {
            formData,
            errors: {
                login: formattedErrors.login?._errors,
                password: formattedErrors.password?._errors,
                _errors: formattedErrors._errors,
            },
        };
    }

    const verifyUserResult = await verifyUser(result.data);

    if (verifyUserResult.type === 'right') {
        await sessionService.createSession(verifyUserResult.value);
        redirect('/');
    }

    return {
        formData,
        errors: {
            _errors: [verifyUserResult.error.message]
        }
    };
}
