import Head from 'next/head';
import fetcher from 'lib/fetcher';
import useSWR from 'swr';

import enforceAuth from 'components/enforceAuth';
import { useEffect, useState } from 'react';

export default function Settings({ user }) {
	const { data: userData = {} } = useSWR(`/api/user/get?user_id=${user.id}`, fetcher);
	const [currency, setCurrency] = useState(userData.currency);
	const { data = [] } = useSWR(`/api/currency`, fetcher);

	useEffect(() => {
		setCurrency(userData.currency);
	}, [userData]);

	const onUpdate = async (data) => {
		try {
			await fetch('/api/user/update', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ currency: data, user_id: user.id }),
			});
			setCurrency(data);
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<>
			<Head>
				<title>Settings - Expense Tracker</title>
				<meta name='description' content='Subscriptions - Expense Tracker' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='h-ful container mx-auto mb-20'>
				<div className='mb-6 flex justify-between'>
					<h1 className='text-2xl text-slate-700'>Settings</h1>
				</div>

				<p className=' mt-2 text-sm font-light italic '>The following options affect how prices are displayed.</p>

				<label className='mt-4 flex items-center'>
					<span className='text-md mr-6 mt-2 block font-semibold leading-6 text-gray-900'>Currency</span>
					<select
						name='currency'
						className='mt-2 block h-9 w-[178px] appearance-none rounded-md bg-white py-2 px-3 pr-8 text-slate-800 shadow-sm ring-1 ring-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm'
						onChange={(event) => {
							onUpdate(event.target.value);
						}}
						value={currency}
					>
						{Object.keys(data).map((key) => (
							<option key={data[key].name} value={data[key].code}>
								{data[key].name}
							</option>
						))}
					</select>
					{currency && currency.length ? (
						<p className='ml-4 mt-2 text-sm'>
							Eg:{' '}
							<span>
								{new Intl.NumberFormat(undefined, {
									style: 'currency',
									currency,
								}).format(100)}
							</span>
						</p>
					) : null}
				</label>
			</div>
		</>
	);
}

export const getServerSideProps = enforceAuth();
