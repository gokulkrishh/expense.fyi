import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import CardLoader from './card-loader';

const CardComponent = ({ title, data }: { title: String; data: String }) => {
	return (
		<Card>
			<CardHeader className="pb-0">
				<CardTitle className="text-xs font-semibold uppercase text-muted-foreground">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="mt-1 text-2xl font-extrabold text-foreground">{data}</p>
			</CardContent>
		</Card>
	);
};

export default function Summary({ isFetching = true }: { isFetching?: boolean }) {
	return (
		<>
			<h2 className="mb-4 font-semibold text-primary dark:text-white">Summary</h2>
			{isFetching ? (
				<CardLoader cards={5} />
			) : (
				<div className="xs:grid-cols-2 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
					<CardComponent title="total income" data="$10,000" />
					<CardComponent title="available balance" data="$10,000" />
					<CardComponent title="total spent" data="$10,000" />
					<CardComponent title="total expenses" data="$10,000" />
					<CardComponent title="total subscriptions" data="$10,000" />
				</div>
			)}
		</>
	);
}
