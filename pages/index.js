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

			<div className='container mx-auto flex h-full'>Overview</div>
		</>
	);
}

export const getServerSideProps = enforceAuth();
