import Head from 'next/head';
import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import AddExpense from 'components/AddExpense';
import Login from 'components/Login';
import SubscriptionData from 'components/SubscriptionData';

export default function Home({}) {
  const { data } = useSWR('/api/subscription/all', fetcher);

  return (
    <>
      <Head>
        <title>Login/Signup - Expense Tracker</title>
        <meta name="description" content="Login/Signup for Expense Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
