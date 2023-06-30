'use client';

import { useOverview } from 'components/context/overview-provider';
import CardLoader from 'components/loader/card';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';

import { formatCurrency } from 'lib/formatter';

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

export default function Summary() {
	const { data, loading } = useOverview();

	const totalExpenses = data.expenses.reduce((acc: any, { price }: any) => Number(price) + acc, 0);
	const totalIncome = data.income.reduce((acc: any, { price }: any) => Number(price) + acc, 0);
	const totalInvesments = data.investments.reduce((acc: any, { price }: any) => Number(price) + acc, 0);
	const totalSubscriptions = data.subscriptions.reduce((acc: any, { price }: any) => Number(price) + acc, 0);
	const totalSpent = totalExpenses + totalInvesments + totalSubscriptions;
	const totalBalance = totalIncome - totalSpent;

	return (
		<>
			<h2 className="mb-4 font-semibold text-primary dark:text-white">Summary</h2>
			{loading ? (
				<CardLoader cards={5} />
			) : (
				<div className="xs:grid-cols-2 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
					<CardComponent title="total income" data={formatCurrency({ value: totalIncome })} />
					<CardComponent title="available balance" data={formatCurrency({ value: totalBalance })} />
					<CardComponent title="total spent" data={formatCurrency({ value: totalSpent })} />
					<CardComponent title="total expenses" data={formatCurrency({ value: totalExpenses })} />
					<CardComponent title="total subscriptions" data={formatCurrency({ value: totalSubscriptions })} />
				</div>
			)}
		</>
	);
}
