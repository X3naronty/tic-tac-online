import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

interface Props {
    login: string;
    rating: number;
}

export function GameCard({ login, rating }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{login}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{rating}</CardDescription>
            </CardContent>
        </Card>
    );
}
