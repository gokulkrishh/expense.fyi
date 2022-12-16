import Head from 'next/head';
import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import AddExpense from 'components/AddExpense';
import SubscriptionData from 'components/SubscriptionData';
import enforceAuthenticated from '/components/enforceAuthenticated';

export default function Overview({}) {
  const { data } = useSWR('/api/subscription/all', fetcher);

  return (
    <div>
      <Head>
        <title>Login/Signup - Expense Tracker</title>
        <meta name="description" content="Overview page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="Overview__header">
        <h1>Overview</h1>
        <AddExpense />
      </div>
      <SubscriptionData data={data} />
    </div>
  );
}

// export const getServerSideProps = enforceAuthenticated();
