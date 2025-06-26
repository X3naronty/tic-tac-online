'use client';

import { Button } from '@/shared/ui/button';
import { FormHeader } from '@/features/auth/ui/form-header';
import { FormField } from '@/features/auth/ui/form-field';
import { FormFooter } from '@/features/auth/ui/form-footer';
import { useActionState, useId } from 'react';
import { Form } from '../ui/form';
import { logInAction } from '../actions/log-in-action';
import { ErrorMessage } from '../ui/error-message';

export default function LogInForm() {
    const [state, dispatch, isPending] = useActionState(logInAction, null);
    const loginId = useId();
    const passwordId = useId();
    return (
        <Form action={dispatch}>
            <FormHeader title="Log In" description="Welcome back! Please sign in to your account" />

            <div className="space-y-4">
                <FormField
                    id={loginId}
                    name="login"
                    type="text"
                    label="Enter your username or email"
                    placeholder="ivanivanov@gmail.com"
                    required
                    errors={state?.errors?.login}
                    defaultValue={state?.formData?.get('login')?.toString()}
                />

                <FormField
                    id={passwordId}
                    name="password"
                    type="password"
                    label="Enter you password"
                    placeholder="Password"
                    required
                    errors={state?.errors?.password}
                    defaultValue={state?.formData?.get('password')?.toString()}
                />

                <Button type="submit" className="w-full">
                    Log In
                </Button>
                <ErrorMessage errors={state?.errors?._errors}/>
            </div>

            <FormFooter text="Don't have an account?" linkText="Sign up here" linkHref="/sign-up" />
        </Form>
    );
}
