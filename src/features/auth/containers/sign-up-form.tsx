'use client';

import { Button } from '@/shared/ui/button';
import { FormHeader } from '@/features/auth/ui/form-header';
import { FormField } from '@/features/auth/ui/form-field';
import { FormFooter } from '@/features/auth/ui/form-footer';
import { useActionState, useId } from 'react';
import { Form } from '../ui/form';
import { signUpAction } from '../actions/sign-up-action';
import { ErrorMessage } from '../ui/error-message';

export default function SignUpForm() {
    const [state, dispatch, isPending] = useActionState(signUpAction, null);

    const loginId = useId();
    const emailId = useId();
    const passwordId = useId();
    const verifyPasswordId = useId();
    return (
        <Form action={dispatch}>
            <FormHeader title="Sign Up" description="Create your account to get started" />

            <div className="space-y-4">
                <FormField
                    id={loginId}
                    name="login"
                    type="text"
                    label="Username"
                    placeholder="Enter your username"
                    required
                    errors={state?.errors?.login}
                    defaultValue={state?.formData?.get('login')?.toString()}
                />

                <FormField
                    id={emailId}
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                    errors={state?.errors?.email}
                    defaultValue={state?.formData?.get('email')?.toString()}
                />

                <FormField
                    id={passwordId}
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    required
                    errors={state?.errors?.password}
                    defaultValue={state?.formData?.get('password')?.toString()}
                />

                <FormField
                    id={verifyPasswordId}
                    name="verify-password"
                    type="password"
                    label="Confirm Password"
                    placeholder="Password"
                    required
                    errors={state?.errors?.['verify-password']}
                    defaultValue={state?.formData?.get('verify-password')?.toString()}
                />

                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
                <ErrorMessage errors={state?.errors?._errors} />
            </div>

            <FormFooter text="Already have an account?" linkText="Log in here" linkHref="/log-in" />
        </Form>
    );
}
