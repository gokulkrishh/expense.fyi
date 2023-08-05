import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Skeleton } from 'components/ui/skeleton';

export default function CardLoader({ cards = 1, className = '' }: { cards?: number; className?: string }) {
	return (
		<div
			className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 ${className}`}
		>
			{Array(cards)
				.fill(0)
				.map((card, index) => (
					<Card key={`${card}-${index}`}>
						<CardHeader className="pb-0">
							<CardTitle>
								<Skeleton className="h-4 rounded-sm" />
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Skeleton className="mt-2 h-7 w-[60%] rounded-sm" />
						</CardContent>
					</Card>
				))}
		</div>
	);
}
