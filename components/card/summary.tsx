'use client';

import { BadgeDollarSign, Banknote, Briefcase, PlayIcon, Wallet2 } from 'lucide-react';

import { useOverview } from 'components/context/overview-provider';
import CardLoader from 'components/loader/card';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';

import { formatCurrency } from 'lib/formatter';

const CardComponent = ({ title, data, icon: Icon }: { title: String; data: String; icon?: any }) => {
	return (
		<Card className="relative">
			<CardHeader className="pb-0">
				<CardTitle className="text-xs font-semibold uppercase text-muted-foreground">{title}</CardTitle>
				{Icon ? <Icon className="absolute right-3 top-1 h-4 w-4" /> : null}
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
					<CardComponent icon={Briefcase} title="total income" data={formatCurrency({ value: totalIncome })} />
					<CardComponent icon={Wallet2} title="available balance" data={formatCurrency({ value: totalBalance })} />
					<CardComponent icon={BadgeDollarSign} title="total spent" data={formatCurrency({ value: totalSpent })} />
					<CardComponent icon={Banknote} title="total expenses" data={formatCurrency({ value: totalExpenses })} />
					<CardComponent
						icon={PlayIcon}
						title="total subscriptions"
						data={formatCurrency({ value: totalSubscriptions })}
					/>
				</div>
			)}
		</>
	);
}
