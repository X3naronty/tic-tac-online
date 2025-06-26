'use client';

import { Either, rightFrom } from '@/shared/lib/either';
import { useActionState, type FormHTMLAttributes, type ReactNode } from 'react';
import type React from 'react';

export function Form({
    action,
    children,
}: {
    action: (formData: FormData) => void | Promise<void>;
    children: ReactNode;
}) {
    return (
        <form action={action} className="mx-auto max-w-[400px] space-y-6 p-6">
            {children}
        </form>
    );
}
