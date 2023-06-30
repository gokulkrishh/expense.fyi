import Summary from 'components/card/summary';
import LayoutHeader from 'components/layout/header';

const title = 'Expense.fyi – Investments';
const description = 'Effortlessly Track and Manage Expenses.';

export const metadata = {
	title,
	description,
};

export default async function Page() {
	return (
		<>
			<LayoutHeader title="income" />
			<div className="p-4 pt-3"></div>
		</>
	);
}
