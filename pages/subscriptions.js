import Head from 'next/head';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from 'lib/fetcher';

import SubscriptionsTable from '/components/SubscriptionsTable';
import AddSubscriptionModal from '/components/AddSubscriptionModal';
import enforceAuth from '/components/enforceAuth';
import { PlusIcon } from '@heroicons/react/24/solid';

export default function Subscriptions({ user }) {
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { data = { all: [] } } = useSWR(
		`/api/subscriptions/all?userId=${user.id}`,
		fetcher
	);

	useEffect(() => {
		const close = (e) => {
			if (e.keyCode === 27) {
				setShow(false);
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [setShow]);

	const onSubmit = async (data) => {
		setIsLoading(true);
		try {
			await fetch(`/api/subscriptions/create`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...data, userId: user.id }),
			});
		} catch (error) {
			console.error(error);
		} finally {
			setShow(false);
			setIsLoading(false);
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
					/>
				) : null}

				<SubscriptionsTable data={data.all} />
			</div>
		</>
	);
}

export const getServerSideProps = enforceAuth();
