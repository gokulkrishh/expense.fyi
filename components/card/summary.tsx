'use client';

import { BadgeDollarSign, Banknote, Briefcase, PlayIcon, Wallet2 } from 'lucide-react';

import { useUser } from 'components/context/auth-provider';
import { useOverview } from 'components/context/overview-provider';
import CardLoader from 'components/loader/card';

import { formatCurrency } from 'lib/formatter';

import SummaryCard from './summary-card';

export default function Summary() {
	const user = useUser();
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
					<SummaryCard
						icon={Briefcase}
						title="total income"
						data={formatCurrency({ value: totalIncome, currency: user.currency, locale: user.locale })}
					/>
					<SummaryCard
						icon={Wallet2}
						title="available balance"
						data={formatCurrency({ value: totalBalance, currency: user.currency, locale: user.locale })}
					/>
					<SummaryCard
						icon={BadgeDollarSign}
						title="total spent"
						data={formatCurrency({ value: totalSpent, currency: user.currency, locale: user.locale })}
					/>
					<SummaryCard
						icon={Banknote}
						title="total expenses"
						data={formatCurrency({ value: totalExpenses, currency: user.currency, locale: user.locale })}
					/>
					<SummaryCard
						icon={PlayIcon}
						title="total subscriptions"
						data={formatCurrency({ value: totalSubscriptions, currency: user.currency, locale: user.locale })}
					/>
				</div>
			)}
		</>
	);
}
