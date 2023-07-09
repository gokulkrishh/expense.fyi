import { InvestmentsContextProvider } from 'components/context/investments-provider';
import LayoutHeader from 'components/layout/header';

import InvestmentsSummary from './summary';
import DataTable from './table';

const title = 'Expense.fyi – Investments';
const description = 'Effortlessly Track and Manage Expenses.';

export const metadata = {
	title,
	description,
};

export default async function Page() {
	return (
		<>
			<LayoutHeader title="investments" />
			<InvestmentsContextProvider>
				<div className="w-full overflow-x-auto p-4 pt-3">
					<InvestmentsSummary />
					<DataTable />
				</div>
			</InvestmentsContextProvider>
		</>
	);
}
