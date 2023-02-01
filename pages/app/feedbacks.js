import Head from 'next/head';

import { sub } from 'date-fns';
import useSWR from 'swr';

import enforceAuth from 'components/Auth/enforceAuth';
import Card from 'components/Card';
import LoaderCard from 'components/Loader/LoaderCard';
import FeedbacksTable from 'components/Table/FeedbacksTable';

import { formatDate } from 'utils/formatter';

export default function Feedbacks({ user }) {
	const { data = [], isLoading } = useSWR(`/api/feedbacks/all`);

	return (
		<>
			<Head>
				<title>Expense.fyi - Feedbacks</title>

				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
			</Head>

			<div className="h-ful mb-20">
				<div className="mb-2 flex justify-between">
					<h1 className="mr-2 mb-2 text-2xl font-extrabold text-black max-sm:mb-4 max-sm:ml-[45px]">Feedbacks</h1>
				</div>

				<h3 className="mb-4 text-black">Summary</h3>
				{isLoading ? (
					<LoaderCard nums={2} />
				) : (
					<div className="mb-6 flex flex-grow-0">
						<Card title="Total Feedbacks" className="relative mr-6 w-[220px]" data={data.length} />
						<Card
							title="Today"
							className="relative mr-6 w-[220px]"
							data={data.filter((datum) => formatDate(datum.created_at) === formatDate(new Date())).length}
						/>
					</div>
				)}

				<FeedbacksTable isLoading={isLoading} data={data} currency={user.currency} locale={user.locale} />
			</div>
			<div className="h-1" />
		</>
	);
}

export const getServerSideProps = enforceAuth();
