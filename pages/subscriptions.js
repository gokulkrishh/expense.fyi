import Head from 'next/head';
import { useEffect, useState } from 'react';

import AddSubscriptionModal from '/components/AddSubscriptionModal';
import enforceAuth from '/components/enforceAuth';

export default function Subscriptions() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const close = (e) => {
			if (e.keyCode === 27) {
				setShow(false);
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [setShow]);

	return (
		<>
			<Head>
				<title>Subscriptions - Expense Tracker</title>
				<meta name='description' content='Subscriptions - Expense Tracker' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='container mx-auto h-full'>
				<button onClick={() => setShow(true)}>Add</button>
				{show ? (
					<AddSubscriptionModal hideModel={() => setShow(false)} />
				) : null}
			</div>
		</>
	);
}

export const getServerSideProps = enforceAuth();
