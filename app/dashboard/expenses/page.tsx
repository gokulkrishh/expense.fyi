import Summary from 'components/card/summary';
import LayoutHeader from 'components/layout/header';
import ExpensesSummary from 'components/summary/expenses';

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
			<div className="p-4 pt-3">{/* <ExpensesSummary /> */}</div>
		</>
	);
}
