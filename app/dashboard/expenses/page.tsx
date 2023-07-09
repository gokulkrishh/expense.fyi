import { ExpensesContextProvider } from 'components/context/expenses-provider';
import LayoutHeader from 'components/layout/header';

import ExpensesSummary from './summary';
import ExpenseTable from './table';

const title = 'Expense.fyi – Expenses';
const description = 'Effortlessly Track and Manage Expenses.';

export const metadata = {
	title,
	description,
};

export default async function Page() {
	return (
		<>
			<LayoutHeader title="expenses" />
			<ExpensesContextProvider>
				<div className="w-full overflow-x-auto p-4 pt-3">
					<ExpensesSummary />
					<ExpenseTable />
				</div>
			</ExpensesContextProvider>
		</>
	);
}
