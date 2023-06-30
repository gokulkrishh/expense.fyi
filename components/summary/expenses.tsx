'use client';

import { useEffect, useState } from 'react';

import { getExpenses } from 'app/dashboard/apis';
import { format, startOfMonth } from 'date-fns';

import SummaryCard from 'components/card/summary-card';
import CardLoader from 'components/loader/card';

import { formatCurrency } from 'lib/formatter';

import { dateFormat } from 'constants/date';

const from = format(startOfMonth(new Date()), dateFormat);
const to = format(new Date(), dateFormat);

export default async function ExpensesSummary() {
	const [loading, setLoading] = useState(true);
	const [state, setState] = useState({ from, to, categories: [], data: [] });

	useEffect(() => {
		async function fetchExpenses() {
			const response = await getExpenses({ from: state.from, to: state.to, categories: state.categories });
			setState({ ...state, data: response });
			setLoading(false);
		}
		// fetchExpenses();
	}, [state]);

	return (
		<>
			<h2 className="mb-4 font-semibold text-primary dark:text-white">Summary</h2>
			{loading ? (
				<CardLoader cards={5} />
			) : (
				<div className="xs:grid-cols-2 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
					<SummaryCard title="total income" data={formatCurrency({ value: 1 })} />
					<SummaryCard title="available balance" data={formatCurrency({ value: 1 })} />
					<SummaryCard title="total spent" data={formatCurrency({ value: 1 })} />
					<SummaryCard title="total expenses" data={formatCurrency({ value: 1 })} />
					<SummaryCard title="total subscriptions" data={formatCurrency({ value: 1 })} />
				</div>
			)}
		</>
	);
}
