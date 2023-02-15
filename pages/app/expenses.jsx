import Head from 'next/head';

import { useState } from 'react';

import { useHotkeys } from 'react-hotkeys-hook';
import useSWR from 'swr';
import textFilter from 'text-filter';

import enforceAuth from 'components/Auth/enforceAuth';
import Card from 'components/Card';
import LoaderCard from 'components/Loader/LoaderCard';
import AddButton from 'components/Modal/AddButton';
import AddExpense from 'components/Modal/AddExpense';
import ExpensesTable from 'components/Table/ExpensesTable';
import { filterMap } from 'components/Table/TableFilter';
import { showErrorToast, showSuccessToast, toastMessages } from 'components/Toast';

import { incrementUsageLimit } from 'lib/usageLimit';

import { formatCurrency } from 'utils/formatter';
import { getApiUrl } from 'utils/url';

import { shortcuts } from 'constants/index';

const addShortcutKey = Object.values(shortcuts.expenses.add.shortcut);

export default function Expenses({ user }) {
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [selected, setSelected] = useState({});
	const [filterKey, setFilterKey] = useState(filterMap.thismonth);
	useHotkeys(addShortcutKey, () => !isLoading && setShow(true));

	const { data = [], mutate, isLoading } = useSWR(getApiUrl(filterKey, 'expenses'));

	const onHide = () => setShow(false);
	const onEdit = (selected) => {
		setShow(true);
		setSelected(selected);
	};

	const onSubmit = async (data) => {
		let url = '/api/expenses/create';
		let method = 'POST';
		let body = JSON.stringify(data);
		const isEditing = selected && selected.id;

		setLoading(true);

		if (isEditing) {
			url = '/api/expenses/update';
			method = 'PATCH';
		}

		try {
			const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body });
			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || res.statusText);
			}

			if (isEditing) {
				showSuccessToast(toastMessages.updated);
			} else {
				incrementUsageLimit(method);
				showSuccessToast(toastMessages.success);
			}
		} catch (error) {
			showErrorToast(error.message);
		} finally {
			mutate();
			setLoading(false);
			onHide();
		}
	};

	const onDelete = async (id) => {
		try {
			const res = await fetch('/api/expenses/delete', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id }),
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || res.statusText);
			}

			showSuccessToast(toastMessages.deleted);
		} catch (error) {
			showErrorToast(error.message);
		} finally {
			mutate();
		}
	};

	const onLookup = (name) => {
		const result = data.filter(textFilter({ query: name, fields: ['name'] }));
		if (result.length) return [result[0]];
		return result;
	};

	return (
		<>
			<Head>
				<title>Expense.fyi - Expenses</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>

			<div className="h-ful mb-20">
				<div className="mb-2 flex justify-between">
					<h1 className="mr-3 mb-2 text-2xl font-extrabold text-black max-sm:mb-4 max-sm:ml-[45px]">Expenses</h1>
				</div>

				<h2 className="mb-4 text-black">Summary</h2>
				{isLoading ? (
					<LoaderCard nums={2} />
				) : (
					<div className="mb-6 grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
						<Card title="Total Expenses" className="relative" data={data.length} />
						<Card
							title="Total Amount"
							className="relative"
							data={formatCurrency(
								data.reduce((acc, datum) => Number(datum.price) + acc, 0),
								user.currency,
								user.locale
							)}
						/>
					</div>
				)}

				<AddExpense
					onHide={onHide}
					onSubmit={onSubmit}
					loading={loading}
					selected={selected}
					currency={user.currency}
					locale={user.locale}
					show={show}
					lookup={onLookup}
				/>

				<ExpensesTable
					onFilterChange={(filterKey) => {
						setFilterKey(filterKey);
					}}
					filterKey={filterKey}
					isLoading={isLoading}
					data={data}
					onEdit={onEdit}
					onDelete={onDelete}
					user={user}
				/>

				{!isLoading ? (
					<AddButton
						onClick={() => {
							if (selected.id) setSelected({});
							setShow(true);
						}}
					/>
				) : null}
			</div>
			<div className="h-1" />
		</>
	);
}

export const getServerSideProps = enforceAuth();
