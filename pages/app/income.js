import Head from 'next/head';

import { useState } from 'react';

import useSWR from 'swr';
import textFilter from 'text-filter';

import enforceAuth from 'components/Auth/enforceAuth';
import Card from 'components/Card';
import LoaderCard from 'components/Loader/LoaderCard';
import AddButton from 'components/Modal/AddButton';
import AddIncome from 'components/Modal/AddIncome';
import IncomeTable from 'components/Table/IncomeTable';
import { showErrorToast, showSuccessToast, toastMessages } from 'components/Toast';

import { incrementUsageLimit } from 'lib/usageLimit';

import { thisMonth } from 'utils/date';
import { formatCurrency } from 'utils/formatter';

export default function Income({ user }) {
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [selected, setSelected] = useState({});
	const { data = [], mutate, isLoading } = useSWR(`/api/income/all`);

	const onHide = () => setShow(false);
	const onEdit = (selected) => {
		setShow(true);
		setSelected(selected);
	};

	const onSubmit = async (data) => {
		let url = '/api/income/create';
		let method = 'POST';
		let body = JSON.stringify(data);
		const isEditing = selected && selected.id;

		setLoading(true);

		if (isEditing) {
			url = '/api/income/update';
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
			if (isEditing) setSelected({});
		}
	};

	const onDelete = async (id) => {
		try {
			const res = await fetch('/api/income/delete', {
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
				<title>Expense.fyi - Income</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
			</Head>

			<div className="h-ful mb-20">
				<div className="mb-2 flex justify-between">
					<h1 className="mr-3 mb-2 text-2xl font-extrabold text-black max-sm:mb-4 max-sm:ml-[45px]">Income</h1>
				</div>

				<h3 className="mb-4 text-black">Summary</h3>
				{isLoading ? (
					<LoaderCard nums={3} />
				) : (
					<div className="mb-6 grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
						<Card title="Total Income Source" className="relative" data={data.length} />
						<Card
							title="Total Amount"
							className="relative"
							data={formatCurrency(
								data.reduce((acc, datum) => Number(datum.price) + acc, 0),
								user.currency,
								user.locale
							)}
						/>
						<Card
							title="This month"
							className="relative"
							data={formatCurrency(
								data.filter(thisMonth).reduce((acc, datum) => Number(datum.price) + acc, 0),
								user.currency,
								user.locale
							)}
						/>
					</div>
				)}

				<AddIncome
					onHide={onHide}
					onSubmit={onSubmit}
					loading={loading}
					selected={selected}
					currency={user.currency}
					locale={user.locale}
					show={show}
					onLookup={onLookup}
				/>

				<IncomeTable isLoading={isLoading} data={data} onEdit={onEdit} onDelete={onDelete} user={user} />

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
