import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card';

export default function CardComponent({ title, data, children }: { title: String; data: String; children?: any }) {
	return (
		<Card className="bg-card text-card-foreground">
			{children ? (
				children
			) : (
				<CardHeader>
					<CardTitle className="!text-xs font-semibold uppercase leading-none tracking-tight text-muted-foreground">
						{title}
					</CardTitle>
					<CardContent className="p-0 text-2xl font-extrabold">{data}</CardContent>
				</CardHeader>
			)}
		</Card>
	);
}
