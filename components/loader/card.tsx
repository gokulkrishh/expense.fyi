import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function CardLoader({ cards = 1 }) {
	return (
		<div className="xs:grid-cols-2 mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
			{Array(cards)
				.fill(0)
				.map((card, index) => (
					<Card key={`${card}-${index}`}>
						<CardHeader className="pb-0">
							<CardTitle className="animate-pulse rounded-sm bg-gray-200 text-xs font-semibold uppercase text-muted-foreground dark:bg-muted">
								<span className="invisible">Loading</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4 pt-0">
							<div className="w-[60%] animate-pulse rounded-sm bg-gray-200 dark:bg-muted">
								<p className="invisible mt-1 text-2xl font-extrabold text-foreground">0</p>
							</div>
						</CardContent>
					</Card>
				))}
		</div>
	);
}
