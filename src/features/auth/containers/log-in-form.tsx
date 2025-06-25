import { Button } from '@/shared/ui/button';
import { FormHeader } from '@/features/auth/ui/form-header';
import { FormField } from '@/features/auth/ui/form-field';
import { FormFooter } from '@/features/auth/ui/form-footer';
import { useId } from 'react';
import { Form } from '../ui/form';

export default function LogInForm() {
    const loginId = useId();
    const passwordId = useId();
    return (
        <Form>
            <FormHeader title="Log In" description="Welcome back! Please sign in to your account" />

            <div className="space-y-4">
                <FormField
                    id={loginId}
                    name="login"
                    type="text"
                    label="Enter your username or email"
                    placeholder="ivanivanov@gmail.com"
                    required
                />

                <FormField
                    id={passwordId}
                    name="password"
                    type="password"
                    label="Enter you password"
                    placeholder="Password"
                    required
                />

                <Button type="submit" className="w-full">
                    Log In
                </Button>
            </div>

            <FormFooter text="Don't have an account?" linkText="Sign up here" linkHref="/sign-up" />
        </Form>
    );
}
