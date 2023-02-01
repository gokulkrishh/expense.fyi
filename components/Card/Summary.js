import {
	BanknotesIcon,
	BriefcaseIcon,
	ChartBarSquareIcon,
	CreditCardIcon,
	PlayIcon,
	ScaleIcon,
} from '@heroicons/react/24/outline';
import { Icon } from '@tremor/react';

import LoaderCard from 'components/Loader/LoaderCard';
import { ExpensesIcon } from 'components/Menu/Sidebar';

import { formatCurrency } from 'utils/formatter';

import Card from '.';

export default function Summary({
	isLoading,
	subscriptionsData,
	expensesData,
	incomeData,
	investmentsData,
	currency,
	locale,
}) {
	const totalSubscriptionsCost = subscriptionsData.reduce((acc, datum) => Number(datum.price) + acc, 0);
	const totalExpenseCost = expensesData.reduce((acc, datum) => Number(datum.price) + acc, 0);
	const totalIncomeAmount = incomeData.reduce((acc, datum) => Number(datum.price) + acc, 0);
	const totalInvestmentsAmount = investmentsData.reduce((acc, datum) => Number(datum.price) * datum.units + acc, 0);
	const totalBalanceAmount = totalIncomeAmount - (totalSubscriptionsCost + totalExpenseCost + totalInvestmentsAmount);
	const totalSpent = totalSubscriptionsCost + totalExpenseCost + totalInvestmentsAmount;

	return (
		<>
			<h2 className="mb-4 text-black">Summary</h2>
			{isLoading ? (
				<LoaderCard nums={5} />
			) : (
				<div className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
					<Card
						title="Total Income"
						className="relative "
						data={formatCurrency(totalIncomeAmount, currency, locale)}
						icon={
							<span className="absolute right-2 top-2">
								<Icon icon={BriefcaseIcon} variant="light" size="xs" color="purple" />
							</span>
						}
					/>

					<Card
						title="Total Spent"
						className="relative"
						data={formatCurrency(totalSpent, currency, locale)}
						icon={
							<span className="absolute right-2 top-2">
								<Icon
									icon={BanknotesIcon}
									tooltip="Total of Expenses, Investments & Subscriptions"
									variant="light"
									size="xs"
									color="orange"
								/>
							</span>
						}
					/>

					<Card
						title="Available Balance"
						className="relative"
						data={formatCurrency(totalBalanceAmount, currency, locale)}
						icon={
							<span className="absolute right-2 top-2">
								<Icon icon={ScaleIcon} variant="light" size="xs" color="sky" />
							</span>
						}
					/>

					<Card
						title="Total expenses"
						className="relative"
						data={formatCurrency(totalExpenseCost, currency, locale)}
						icon={
							<span className="absolute right-2 top-2">
								<Icon icon={CreditCardIcon} variant="light" size="xs" color="fuchsia" />
							</span>
						}
					/>

					<Card
						title="Total Subscriptions"
						className="relative"
						data={formatCurrency(totalSubscriptionsCost, currency, locale)}
						icon={
							<span className="absolute right-2 top-2">
								<Icon icon={PlayIcon} variant="light" size="xs" color="red" />
							</span>
						}
					/>
				</div>
			)}
		</>
	);
}
