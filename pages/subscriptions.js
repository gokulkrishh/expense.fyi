import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import { PlusIcon } from '@heroicons/react/24/solid';

import fetcher from 'lib/fetcher';
import SubscriptionsTable from '/components/SubscriptionsTable';
import AddSubscription from '/components/AddSubscription';
import enforceAuth from '/components/enforceAuth';

const initialState = { show: false, loading: false, selected: {}, error: '' };

export default function Subscriptions({ user }) {
	const [state, setState] = useState(initialState);
	const { data, mutate } = useSWR(`/api/subscriptions/all?userId=${user.id}`, fetcher);

	const refresh = useCallback(() => mutate(), [mutate]);
	const onHide = () => setState({ ...state, show: false, selected: {} });
	const onEdit = (selected) => setState({ ...state, selected, show: true });
	useEffect(() => {
		const close = (e) => {
			if (e.keyCode === 27) {
				setState(initialState);
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, []);

	const onSubmit = async (data) => {
		let url = '/api/subscriptions/create';
		let method = 'POST';
		let body = JSON.stringify({ ...data, user_id: user.id });

		setState({ ...state, loading: true });

		if (state.selected && state.selected.id) {
			url = '/api/subscriptions/update';
			method = 'PATCH';
		}

		try {
			await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body });
		} catch (error) {
			setState({ ...state, error: error.message });
		} finally {
			setState((prev) => ({ ...prev, loading: false, show: false, selected: {} }));
			refresh();
		}
	};

	const onDelete = async (id) => {
		setState({ ...state, loading: true });
		try {
			await fetch('/api/subscriptions/delete', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id }),
			});
		} catch (error) {
			setState({ ...state, error: error.message });
		} finally {
			setState((prev) => ({ ...prev, loading: false }));
			refresh();
		}
	};

	return (
		<>
			<Head>
				<title>Subscriptions - Expense Tracker</title>
				<meta name='description' content='Subscriptions - Expense Tracker' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='container mx-auto h-full'>
				<div className='mb-8 flex justify-between'>
					<h1 className=' text-2xl text-slate-700'>Subscriptions</h1>
					<button
						className='-mt-2 flex items-center justify-between rounded-full bg-sky-500 p-3 font-normal text-white hover:bg-sky-600'
						onClick={() => {
							setState({ ...state, show: true });
						}}
					>
						<PlusIcon className='h-6 w-6 text-white' />
					</button>
				</div>
				{state.show ? (
					<AddSubscription onHide={onHide} onSubmit={onSubmit} loading={state.loading} selected={state.selected} />
				) : null}

				<SubscriptionsTable data={data} onEdit={onEdit} onDelete={onDelete} />
			</div>
		</>
	);
}

export const getServerSideProps = enforceAuth();
