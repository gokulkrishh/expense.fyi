import Head from 'next/head';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from 'lib/fetcher';

import SubscriptionsTable from '/components/SubscriptionsTable';
import AddSubscriptionModal from '/components/AddSubscriptionModal';
import enforceAuth from '/components/enforceAuth';

export default function Subscriptions({ user }) {
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { data } = useSWR(`/api/subscriptions/all?userId=${user.id}`, fetcher);

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
				<h1 className='mb-8 text-2xl text-slate-700'>Subscriptions</h1>
				<button onClick={() => setShow(true)}>Add</button>
				{show ? (
					<AddSubscriptionModal
						onHide={() => setShow(false)}
						onSubmit={onSubmit}
						isLoading={isLoading}
					/>
				) : null}

				<SubscriptionsTable data={data} />
			</div>
		</>
	);
}

export const getServerSideProps = enforceAuth();
