'use client';

import { Banknote, Briefcase, PiggyBank, PlayIcon, Wallet2 } from 'lucide-react';

import { useUser } from 'components/context/auth-provider';
import { useOverview } from 'components/context/overview-provider';
import CardLoader from 'components/loader/card';

import { formatCurrency } from 'lib/formatter';

import SummaryCard from '../../components/card/summary-card';

export default function Summary() {
	const user = useUser();
	const { data, loading } = useOverview();

	const totalExpenses = data.expenses.reduce((acc: any, { price }: any) => Number(price) + acc, 0);
	const totalIncome = data.income.reduce((acc: any, { price }: any) => Number(price) + acc, 0);
	const totalInvesments = data.investments.reduce(
		(acc: any, { price, units }: any) => Number(price) * Number(units) + acc,
		0
	);
	const totalSubscriptions = data.subscriptions
		.filter(({ paid_dates }: any) => paid_dates.length)
		.reduce((acc: any, { price, paid_dates }: any) => Number(price) * paid_dates.length + acc, 0);

	const totalSpent = totalExpenses + totalInvesments + totalSubscriptions;
	const totalBalance = totalIncome - totalSpent;

	return (
		<>
			<h2 className="mb-4 font-semibold text-primary dark:text-white">Summary</h2>
			{loading ? (
				<CardLoader cards={5} />
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
						icon={Banknote}
						title="total spent"
						tooltip="Total of expenses + investments + subscriptions"
						data={formatCurrency({ value: totalSpent, currency: user.currency, locale: user.locale })}
					/>
					<SummaryCard
						icon={PiggyBank}
						title="total investment"
						data={formatCurrency({ value: totalInvesments, currency: user.currency, locale: user.locale })}
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
