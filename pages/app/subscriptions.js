import Head from 'next/head';

import { useCallback, useState } from 'react';

import useSWR from 'swr';

import enforceAuth from 'components/Auth/enforceAuth';
import Card from 'components/Card';
import LoaderCard from 'components/Loader/LoaderCard';
import AddButton from 'components/Modal/AddButton';
import AddSubscription from 'components/Modal/AddSubscription';
import SubscriptionsTable from 'components/Table/SubscriptionsTable';
import { showErrorToast, showSuccessToast, toastMessages } from 'components/Toast';

import { incrementUsageLimit } from 'lib/usageLimit';

import { formatCurrency } from 'utils/formatter';

import { payingKey } from 'constants/index';

export default function Subscriptions({ user }) {
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [selected, setSelected] = useState({});
	const { data = [], mutate, isLoading } = useSWR(`/api/subscriptions/all`);
	const monthlyData = data.filter((datum) => datum.active && datum.paid === payingKey.monthly);
	const yearlyData = data.filter((datum) => datum.active && datum.paid === payingKey.yearly);

	const onHide = () => setShow(false);

	const onEdit = (selected) => {
		setShow(true);
		setSelected(selected);
	};

	const onSubmit = async (data) => {
		setLoading(true);

		let url = '/api/subscriptions/create';
		let method = 'POST';
		let body = JSON.stringify(data);
		const isEditing = selected && selected.id;

		if (isEditing) {
			url = '/api/subscriptions/update';
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
			const res = await fetch('/api/subscriptions/delete', {
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

	const onActive = async (data) => {
		try {
			const res = await fetch('/api/subscriptions/update', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || res.statusText);
			}

			showSuccessToast(`${data.name} is ${data.active ? 'active now' : 'cancelled'}!`);
		} catch (error) {
			showErrorToast(error.message);
		} finally {
			mutate();
		}
	};

	return (
		<>
			<Head>
				<title>Expense.fyi - Subscriptions</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>

			<div className="h-ful mb-20">
				<div className="mb-2 flex justify-between">
					<h1 className="mr-3 mb-2 text-2xl font-extrabold text-black max-sm:mb-4 max-sm:ml-[45px]">Subscriptions</h1>
				</div>

				<h2 className="mb-4 text-black">Summary</h2>
				{isLoading ? (
					<LoaderCard nums={5} />
				) : (
					<div className="mb-6 grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
						<Card title="Total Subscriptions" className="relative" data={data.length} />

						<Card
							title="Active - Cancelled"
							className="relative"
							data={`${data.filter((datum) => datum.active).length} - ${data.filter((datum) => !datum.active).length}`}
						/>

						<Card
							title={`Total Active - Yearly`}
							className="relative"
							data={formatCurrency(
								yearlyData.reduce((acc, datum) => Number(datum.price) + acc, 0),
								user.currency,
								user.locale
							)}
						/>

						<Card
							title={`Total Active - Monthly`}
							className="relative"
							data={formatCurrency(
								monthlyData.reduce((acc, datum) => Number(datum.price) + acc, 0),
								user.currency,
								user.locale
							)}
						/>
					</div>
				)}

				<AddSubscription
					onHide={onHide}
					onSubmit={onSubmit}
					loading={loading}
					selected={selected}
					currency={user.currency}
					locale={user.locale}
					show={show}
				/>

				<SubscriptionsTable
					isLoading={isLoading}
					data={data}
					onEdit={onEdit}
					onActive={onActive}
					onDelete={onDelete}
					user={user}
				/>
			</div>

			{!isLoading ? (
				<AddButton
					onClick={() => {
						if (selected.id) setSelected({});
						setShow(true);
					}}
				/>
			) : null}

			<div className="h-1" />
		</>
	);
}

export const getServerSideProps = enforceAuth();
