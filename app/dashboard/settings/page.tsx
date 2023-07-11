import LayoutHeader from 'components/layout/header';

import Account from './account';
import DeleteAccount from './delete-account';
import Plans from './plans';
import Theme from './theme';
import Usage from './usage';

const title = 'Expense.fyi – Settings';
const description = 'Effortlessly Track and Manage Expenses.';

export const metadata = {
	title,
	description,
};

export default async function Page() {
	return (
		<>
			<LayoutHeader title="settings" />
			<div className="mt-6 w-full overflow-x-auto p-4 pt-3">
				<div className="m-auto flex w-full max-w-2xl flex-col items-center space-y-6">
					<Account />
					<Theme />
					<Usage />
					<Plans />
					<DeleteAccount />
				</div>
			</div>
		</>
	);
}
