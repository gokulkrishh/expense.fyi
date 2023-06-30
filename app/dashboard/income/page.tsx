import Summary from 'components/card/summary';
import LayoutHeader from 'components/layout/header';

const title = 'Expense.fyi – Income';
const description = 'Effortlessly Track and Manage Expenses.';

export const metadata = {
	title,
	description,
};

export default async function Page() {
	return (
		<>
			<LayoutHeader title="investments" />
			<div className="p-4 pt-3"></div>
		</>
	);
}
