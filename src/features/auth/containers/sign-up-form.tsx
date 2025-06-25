import { Button } from '@/shared/ui/button';
import { FormHeader } from '@/features/auth/ui/form-header';
import { FormField } from '@/features/auth/ui/form-field';
import { FormFooter } from '@/features/auth/ui/form-footer';
import { useId } from 'react';
import { Form } from '../ui/form';

export default function SignUpForm() {
    const loginId = useId();
    const emailId = useId();
    const passwordId = useId();
    const verifyPasswordId = useId();
    return (
        <Form>
            <FormHeader title="Sign Up" description="Create your account to get started" />

            <div className="space-y-4">
                <FormField
                    id={loginId}
                    name="login"
                    type="text"
                    label="Username"
                    placeholder="Enter your username"
                    required
                />

                <FormField id={emailId} name="email" type="email" label="Email" placeholder="Enter your email" required />

                <FormField
                    id={passwordId}
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    required
                />

                <FormField
                    id={verifyPasswordId}
                    name="verify-password"
                    type="password"
                    label="Confirm Password"
                    placeholder="Password"
                    required
                />

                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
            </div>

            <FormFooter text="Already have an account?" linkText="Log in here" linkHref="/log-in" />
        </Form>
    );
}
