import Head from 'next/head';
import enforceAuth from '/components/enforceAuth';

export default function Home() {
	return (
		<>
			<Head>
				<title>Overview - Expense Tracker</title>
				<meta name='description' content='Expense Tracker' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='container h-full'>
				<h1 className='mb-8 text-2xl text-slate-700'>Overview</h1>
			</div>
		</>
	);
}

export const getServerSideProps = enforceAuth();
