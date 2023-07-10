'use client';

import SummaryCard from 'components/card/summary-card';
import { useUser } from 'components/context/auth-provider';
import { useInvestments } from 'components/context/investments-provider';
import CardLoader from 'components/loader/card';

import { formatCurrency } from 'lib/formatter';

export default function InvestmentsSummary() {
	const user = useUser();
	const { data = [], loading = true } = useInvestments();

	return (
		<>
			<h2 className="mb-4 font-semibold text-primary dark:text-white">Summary</h2>
			{loading ? (
				<CardLoader cards={2} className="mb-6" />
			) : (
				<div className="xs:grid-cols-2 mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
					<SummaryCard title="total investments" data={data.length} />
					<SummaryCard
						title="total amount"
						data={formatCurrency({
							value: data.reduce((acc: any, datum: any) => Number(datum.price) + acc, 0),
							currency: user?.currency,
							locale: user?.locale,
						})}
					/>
				</div>
			)}
		</>
	);
}