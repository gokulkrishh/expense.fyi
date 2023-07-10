import { SubscriptionsContextProvider } from 'components/context/subscriptions-provider';
import LayoutHeader from 'components/layout/header';

import SubscriptionsSummary from './summary';
import SubscriptionsTable from './table';

const title = 'Expense.fyi – Subscriptions';
const description = 'Effortlessly Track and Manage Expenses.';

export const metadata = {
	title,
	description,
};

export default async function Page() {
	return (
		<>
			<LayoutHeader title="subscriptions" />
			<SubscriptionsContextProvider>
				<div className="w-full overflow-x-auto p-4 pt-3">
					<SubscriptionsSummary />
					<SubscriptionsTable />
				</div>
			</SubscriptionsContextProvider>
		</>
	);
}
