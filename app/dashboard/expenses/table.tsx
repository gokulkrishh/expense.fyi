'use client';

import AddExpense from 'components/add/expenses';
import { useUser } from 'components/context/auth-provider';
import { useExpenses } from 'components/context/expenses-provider';
import DataTable from 'components/table/data-table';

import { columns } from './columns';

export default function ExpenseTable() {
	const { data, loading, filter } = useExpenses();
	const user = useUser();
	return (
		<>
			<DataTable
				options={{ user, onDelete: () => {}, onEdit: () => {} }}
				filter={filter}
				columns={columns}
				data={data}
				loading={loading}
				filename="Expenses"
			/>
			{/* <AddExpense /> */}
		</>
	);
}
