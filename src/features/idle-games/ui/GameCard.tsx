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
            <CardHeader className="mb-2">
                <CardTitle>Player: {login}</CardTitle>
            </CardHeader>
            <CardContent className="mb-4">
                <CardDescription>Current rating: {rating}</CardDescription>
            </CardContent>
            <CardFooter className="">
                <Link href={`/game/${id}`} className="">
                    Join 
                </Link>
            </CardFooter>
        </Card>
    );
}
