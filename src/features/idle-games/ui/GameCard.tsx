import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import Link from 'next/link';

interface Props {
    id: string;
    login: string;
    rating: number;
}

export function GameCard({ id, login, rating }: Props) {
    return (
        <Card className="relative hover:opacity-75 duration-300">
            <CardHeader className="mb-2">
                <CardTitle>Player: {login}</CardTitle>
            </CardHeader>
            <CardContent className="mb-4">
                <CardDescription>Current rating: {rating}</CardDescription>
            </CardContent>
            <CardFooter className="">
                <Link href={`/game/${id}`} className="flex items-center gap-2 text-lg after:inset-0 after:block after:absolute">
                    Join
                   
                </Link>
            </CardFooter>
        </Card>
    );
}
