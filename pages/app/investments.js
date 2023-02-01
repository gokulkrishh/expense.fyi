import Head from 'next/head';

import { useCallback, useState } from 'react';

import useSWR from 'swr';

import enforceAuth from 'components/Auth/enforceAuth';
import Card from 'components/Card';
import LoaderCard from 'components/Loader/LoaderCard';
import AddButton from 'components/Modal/AddButton';
import AddInvestment from 'components/Modal/AddInvestment';
import InvestmentTable from 'components/Table/InvestmentTable';
import { showErrorToast, showSuccessToast, toastMessages } from 'components/Toast';

import { incrementUsageLimit } from 'lib/usageLimit';

import { formatCurrency } from 'utils/formatter';

export default function Investments({ user }) {
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [selected, setSelected] = useState({});
	const { data = [], mutate, isLoading } = useSWR(`/api/investments/all`);

	const onHide = () => setShow(false);
	const onEdit = (selected) => {
		setShow(true);
		setSelected(selected);
	};

	const onSubmit = async (data) => {
		let url = '/api/investments/create';
		let method = 'POST';
		let body = JSON.stringify(data);

		setLoading(true);

		const isEditing = selected && selected.id;

		if (isEditing) {
			url = '/api/investments/update';
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
			const res = await fetch('/api/investments/delete', {
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

	return (
		<>
			<Head>
				<title>Expense.fyi - Investments</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
			</Head>

			<div className="h-ful mb-20">
				<div className="mb-2 flex justify-between">
					<h1 className="mr-2 mb-2 text-2xl font-extrabold text-black max-sm:mb-4 max-sm:ml-[45px]">Investments</h1>
				</div>

				<h3 className="mb-4 text-black">Summary</h3>
				{isLoading ? (
					<LoaderCard nums={2} />
				) : (
					<div className="mb-6 grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
						<Card title="Total Investments" className="relative" data={data.length} />
						<Card
							title="Total Amount"
							className="relative"
							data={formatCurrency(
								data.reduce((acc, datum) => Number(datum.price) * datum.units + acc, 0),
								user.currency,
								user.locale
							)}
						/>

						{/* <Card
						title={`Top Investment Category`}
						className="relative w-[220px]"
						data={data.map((acc, datum) => datum.category === 'US Stock')}
					/> */}
					</div>
				)}

				<AddInvestment
					onHide={onHide}
					onSubmit={onSubmit}
					loading={loading}
					selected={selected}
					currency={user.currency}
					locale={user.locale}
					show={show}
				/>

				<InvestmentTable isLoading={isLoading} data={data} onEdit={onEdit} onDelete={onDelete} user={user} />

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
