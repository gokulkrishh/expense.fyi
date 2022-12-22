import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from 'lib/fetcher';

import SubscriptionsTable from '/components/SubscriptionsTable';
import AddSubscriptionModal from '/components/AddSubscriptionModal';
import enforceAuth from '/components/enforceAuth';
import { PlusIcon } from '@heroicons/react/24/solid';

export default function Subscriptions({ user }) {
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedSub, setSelectedSub] = useState({});
	const { data = { all: [] } } = useSWR(
		`/api/subscriptions/all?userId=${user.id}`,
		fetcher
	);

	const onHide = useCallback(() => {
		setSelectedSub({});
		setShow(false);
	}, []);

	useEffect(() => {
		const close = (e) => {
			if (e.keyCode === 27) {
				onHide();
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [onHide]);

	const onSubmit = async (data) => {
		setIsLoading(true);
		let url = '/api/subscriptions/create';
		let method = 'POST';
		if (selectedSub && selectedSub.id) {
			url = '/api/subscriptions/update';
			method = 'PATCH';
		}
		try {
			await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...data, userId: user.id }),
			});
		} catch (error) {
			console.error(error);
		} finally {
			onHide();
			setIsLoading(false);
		}
	};

	const onEdit = (selectedData) => {
		setSelectedSub(selectedData);
		setShow(true);
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
						className='flex items-center justify-between rounded-full bg-sky-500 p-2 font-normal text-white hover:bg-sky-700'
						onClick={() => setShow(true)}
					>
						<PlusIcon className='h-5 w-5 text-white' />
					</button>
				</div>
				{show ? (
					<AddSubscriptionModal
						onHide={() => setShow(false)}
						onSubmit={onSubmit}
						isLoading={isLoading}
						data={selectedSub}
					/>
				) : null}

				<SubscriptionsTable data={data.all} onEdit={onEdit} />
			</div>
		</>
	);
}

export const getServerSideProps = enforceAuth();
