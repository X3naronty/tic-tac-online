import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export function Form({ children }: Props) {
    return <form className="mx-auto max-w-[400px] space-y-6 p-6">{children}</form>;
}
