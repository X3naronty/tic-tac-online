import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface Props {
    id: string;
    login: string;
    rating: number;
}

export function GameCard({ id, login, rating }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{login}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{rating}</CardDescription>
            </CardContent>
            <CardFooter>
                <Link href={`/game/${id}?join=true`}>
                    Join 
                </Link>
            </CardFooter>
        </Card>
    );
}
